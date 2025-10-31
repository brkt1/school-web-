import { Key } from "@/utils/enums";
import { FaFacebook, FaInstagram, FaLinkedin, FaTelegram, FaYoutube } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { ReactElement } from "react";

export const socialMediaIcons : {[key: number]: React.ReactElement} = {
    [Key.EMAIL]: <MdOutlineEmail style={{ color: '#D44638' }} />, // Red for email
    [Key.FACEBOOK]: <FaFacebook style={{ color: '#1877F2' }} />, // Facebook blue
    [Key.INSTRAGRAM]: <FaInstagram style={{ color: '#E1306C' }} />, // Instagram gradient-like pinkish
    [Key.LINKEDIN]: <FaLinkedin style={{ color: '#0A66C2' }} />, // LinkedIn blue
    [Key.TELEGRAM]: <FaTelegram style={{ color: '#0088cc' }} />, // Telegram blue
    [Key.TELEPHONE]: <BsFillTelephoneFill style={{ color: '#34B7F1' }} />, // General color for phone
    [Key.TWITTER]: <FaXTwitter style={{ color: '#1DA1F2' }} />, // Twitter blue
    [Key.YOUTUBE]: <FaYoutube style={{ color: '#FF0000' }} /> // YouTube red
};