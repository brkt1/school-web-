from io import BytesIO
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.enums import TA_RIGHT, TA_LEFT

from take_the_stage import settings
import datetime

def asUnicode(value, enc='utf8'):
    if isinstance(value, bytes):
        return value.decode(enc)
    elif isinstance(value, datetime.datetime):
        return value.strftime('%d %b %Y, %-I:%M %p')
    return str(value)

def generate_receipt_pdf(data):
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=A4)
    c.setTitle("Receipt")
    width, height = A4

    margin = 40
    line_height = 15

    # Register Amharic font
    pdfmetrics.registerFont(TTFont('NotoEthiopic', 'NotoSansEthiopic-Regular.ttf'))

    y = height - 10 * mm
    right_margin = width - 20 * mm
    x_right = width - 120
    x = 20 * mm  # left margin

    logo_path = os.path.join(settings.BASE_DIR, 'static', 'images', 'logo.png')
    logo_width = 30 * mm
    logo_height = 30 * mm

    stamp_path = os.path.join(settings.BASE_DIR, 'static', 'images', 'stamp.png')
    stamp_width = 50 * mm
    stamp_height = 50 * mm

    # Position the stamp where you want (e.g., bottom right corner)
    stamp_x = width - margin - stamp_width
    stamp_y = margin  # near bottom margin

    def draw_line():
        nonlocal y
        c.line(margin, y, width - margin, y)
        y -= line_height

    def draw_label_value(amharic_label, label, value):
        nonlocal y
        x_local = margin
        c.setFont("NotoEthiopic", 10)
        c.drawString(x_local, y, amharic_label)
        x_local += c.stringWidth(amharic_label, "NotoEthiopic", 10) + 3

        c.setFont("Helvetica-Bold", 10)
        label_text = f"{label}: "
        c.drawString(x_local, y, label_text)
        x_local += c.stringWidth(label_text, "Helvetica-Bold", 10)

        c.setFont("Helvetica", 10)
        c.drawString(x_local, y, value or "")
        y -= line_height

    # Header and company info
    c.drawImage(logo_path, x, y - 80, width=logo_width, height=logo_height, mask='auto')
    c.drawImage(stamp_path, stamp_x, stamp_y, width=stamp_width, height=stamp_height, mask='auto')


    c.setFont("Helvetica-Bold", 12)
    c.drawRightString(right_margin, y, "Take the Stage Trading P.L.C.")
    y -= 6 * mm
    c.setFont("Helvetica", 10)
    c.drawRightString(right_margin, y, "SPEAK LIKE A LEADER!")
    y -= 6 * mm

    c.setFont("Helvetica-Bold", 10)
    c.drawRightString(x_right + 5, y, "TIN No.:")
    c.setFont("Helvetica", 10)
    c.drawString(x_right + 10, y, "0090452495")
    y -= 6 * mm

    c.setFont("Helvetica-Bold", 10)
    c.drawRightString(x_right, y, "VAT Reg No.:")
    c.setFont("Helvetica", 10)
    c.drawString(x_right + 5, y, "32817900002")
    y -= 6 * mm

    c.setFont("Helvetica-Bold", 10)
    c.drawRightString(x_right - 10, y, "VAT Reg.Date:")
    c.setFont("NotoEthiopic", 10)
    c.drawString(x_right - 9, y, "ነሀሴ ")
    c.setFont("Helvetica", 10)
    c.drawString(x_right + 20, y, "01/2017 ")
    c.setFont("NotoEthiopic", 10)
    c.drawString(x_right + 60, y, "ዓ.ም")
    y -= 6 * mm

    x_start = right_margin - 135
    c.setFont("NotoEthiopic", 10)
    c.drawRightString(x_start, y, "የደረሰኝ ቁጥር")
    c.setFont("Helvetica-Bold", 10)
    c.drawString(x_start + 5, y, "/ Invoice No.:")
    text_width = c.stringWidth("/ Invoice No.:", "Helvetica-Bold", 10)
    c.setFont("Helvetica", 10)
    c.drawString(x_start + 5 + text_width + 5, y, data['local_invoice_no'])
    y -= 10 * mm

    draw_line()

    c.setFont("NotoEthiopic", 10)
    am_width = c.stringWidth("ተጨማሪ እሴት ታክስ", "NotoEthiopic", 10)
    c.setFont("Helvetica-Bold", 10)
    en_width = c.stringWidth("/ Value Add Tax Cash Sales Invoice", "Helvetica-Bold", 10)
    total_width = am_width + 5 + en_width
    x_center = (width - total_width) / 2

    c.setFont("NotoEthiopic", 10)
    c.drawString(x_center, y, "ተጨማሪ እሴት ታክስ")
    c.setFont("Helvetica-Bold", 10)
    c.drawString(x_center + am_width + 5, y, "/ Value Add Tax Cash Sales Invoice")
    y -= 10 * mm

    draw_label_value("የከፋይ ስም", " / Payer Name", data["payer_name"])
    draw_label_value("የከፋይ ስልክ", " / Payer Phone", data["payer_phone"])
    draw_label_value("የከፋይ ቲን ቁ.", " / Payer TIN No.", data["payer_tin"])
    draw_label_value("የተ.እ.ታ.ቁጥር", " / VAT Reg Number", data["vat_number"])
    draw_label_value("የተመዘገበበት ቀን", " / VAT Reg Date", data["vat_date"])
    draw_label_value("የከፋይ አድራሻ", " / Payer Address", data["payer_address"])
    draw_label_value("ቀን", " / Date", asUnicode(data["date"]))
    draw_label_value("የክፍያ ሁኔታ", " / transaction status", data["payment_status"])
    draw_label_value("የክፍያ ዘዴ", " / Payment Mode", data["payment_method"])
    draw_label_value("የደረሰኝ ቁጥር", " / Invoice No.", data["invoice_no"])
    draw_label_value("የከፋይ የባንክ አካውንት ቁጥር", " / Payer Bank Acc. No.", data["payer_account"])

    y -= 25

    # --- Platypus Table for Transactions ---

    # Build table data (header + transactions + totals)
    amharic_font = 'NotoEthiopic'

    header_style = ParagraphStyle('header', fontSize=9)

    header_row = [
        Paragraph(f'<font name="{amharic_font}">የክፍያ ቁጥር</font> / Transaction No', header_style),
        Paragraph(f'<font name="{amharic_font}">የክፍያ አይነት</font> / Product', header_style),
        Paragraph(f'<font name="{amharic_font}">የተከፈለው መጠን</font> / Settled Amount', header_style),
    ]

    table_data = [header_row]

    for tx in data["transactions"]:
        table_data.append([str(tx["no"]), tx["product"], f"{tx['amount']:.2f}"])
    
    amharic_style = ParagraphStyle('Amharic', fontName='NotoEthiopic', fontSize=9)
    english_style = ParagraphStyle('English', fontName='Helvetica', fontSize=9)

    # Create a Paragraph with both parts using <font> tags
    label_html = '<font name="NotoEthiopic">የአገልግሎት ክፍያ </font><font name="Helvetica"> / Service Fee</font>'
    label_para = Paragraph(label_html, amharic_style)

    vat_html = '<font name="NotoEthiopic">ተ.እ.ታ </font><font name="Helvetica"> / VAT(15%)</font>'
    vat_para = Paragraph(vat_html, amharic_style)

    total_html = '<font name="NotoEthiopic">ጠቅላላ የተከፈለ </font><font name="Helvetica"> / Total Paid Amount</font>'
    tota_para = Paragraph(total_html, amharic_style)

    # Add totals rows (empty first column)
    # table_data.append(["", label_para, f"{data['service_fee']:.2f}"])
    table_data.append(["", vat_para, f"{data['vat']:.2f}"])
    table_data.append(["", tota_para, f"{data['total']:.2f}"])

    # Create Table object
    col_widths = [130, 250, 130]
    table = Table(table_data, colWidths=col_widths)

    # Style the table
    style = TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#d9d9d9")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.black),
        ('ALIGN', (0,0), (0,-1), 'CENTER'),
        ('ALIGN', (2,0), (2,-1), 'RIGHT'),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('BOTTOMPADDING', (0,0), (-1,0), 8),
        ('GRID', (0,0), (-1,-1), 0.5, colors.grey),
    ])

    # Highlight last row (total paid amount)
    style.add('FONTNAME', (1,-1), (-1,-1), 'Helvetica-Bold')
    style.add('BACKGROUND', (0,-1), (-1,-1), colors.HexColor("#f0f0f0"))

    table.setStyle(style)

    # Calculate approx height for the table
    row_height = 18
    table_height = row_height * len(table_data)

    # Draw the table on the canvas at (margin, y - table_height)
    table.wrapOn(c, width, height)
    table.drawOn(c, margin, y - table_height)

    y -= table_height + 10  # update y after table

    # Continue with remaining summary info

    # c.setFont("Helvetica-Bold", 10)
    # c.drawString(margin, y, "Total Paid")
    # c.drawRightString(width - margin, y, f"{data['total']:.2f}")
    y -= line_height

    c.setFont("Helvetica", 10)
    draw_label_value("የገንዘብ ልክ በፊደል", " / Total Amount in Words", data["amount_in_words"])
    # draw_label_value("የክፍያ ሁኔታ", " / Payment Method", data["payment_method"])

    y -= 25
    c.setFont("Helvetica", 9)
    y -= 5
    c.drawCentredString(right_margin - 125, y,
                        "Keker Building,Mexico kirkos sub city,Addis Ababa,Ethiopia")
    y -= 15
    c.drawCentredString(right_margin - 130, y,
                        "Tel:+251923683561| Takestage01@gmail.com| www.takethestageplc.com")

    c.showPage()
    c.save()
    buffer.seek(0)
    return buffer
