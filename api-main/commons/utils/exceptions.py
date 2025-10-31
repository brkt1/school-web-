from rest_framework.views import exception_handler
from http import HTTPStatus
from typing import Any
from rest_framework.response import Response
from django.db import IntegrityError, DatabaseError
from rest_framework import status
import logging
import re

logger = logging.getLogger(__name__)

def api_exception_handler(exc: Exception, context: "dict[str, Any]") -> Response:
    """Custom API exception handler."""

    response = exception_handler(exc, context)

    if response is None:
        if isinstance(exc, IntegrityError):
            logger.exception("IntegrityError in view: %s", context.get("view"))

            # Try to extract unique field name from exception message
            # This part depends on the database backend (PostgreSQL format shown here)
            # You can adjust the regex for SQLite/MySQL if needed
            detail = str(exc)
            match = re.search(r'Key \((\w+)\)=\(.+?\) already exists', detail)
            if match:
                field = match.group(1)
                message = f"{field.capitalize()} already exists."
            else:
                message = "A database integrity error occurred."

            response = Response(
                {"detail": message},
                status=status.HTTP_400_BAD_REQUEST
            )

        elif isinstance(exc, DatabaseError):
            logger.exception("DatabaseError in view: %s", context.get("view"))
            response = Response(
                {"detail": "A database error occurred. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    if response is not None:
        http_code_to_message = {v.value: v.description for v in HTTPStatus}
        status_code = response.status_code

        error_payload = {
            "error": {
                "status_code": status_code,
                "message": http_code_to_message.get(status_code, "Unknown error"),
                "details": response.data,
            }
        }
        response.data = error_payload

    return response
