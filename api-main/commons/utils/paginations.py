# from urllib import response
from rest_framework import pagination
from rest_framework.response import Response
from urllib import parse
from base64 import b64encode
from django.utils.encoding import force_str


class CustomPagination(pagination.PageNumberPagination):
    page_size_query_param = 'ps'
    max_page_size = 200  # Increased from 50 to 200 to support dropdown requests
    page_query_param = 'pn'

    def get_paginated_response(self, data):
        response = {}
        response['count'] = self.page.paginator.count
        response['next'] = self.get_next_link()
        response['previous'] = self.get_previous_link()
        response['results'] = data
        return Response(response)  # Fixed: removed data= to return response directly


class CustomCursorPagination(pagination.CursorPagination):
    page_size_query_param = 'ps'
    page_size = 5

    ordering = 'id'
    def get_ordering(self, request, queryset, view):
        ordering = None
        ordering_filters = [
            filter_cols for filter_cols in getattr(view, 'filter_backends', [])
            if hasattr(filter_cols, 'get_ordering')
        ]

        if ordering_filters:
            filter_cols = ordering_filters[0]
            filter_instance = filter_cols()
            ordering = filter_instance.get_ordering(request, queryset, view)

        if ordering is None:
            ordering = getattr(view, "ordering", "id")
            
        if ordering is None:
            ordering = self.ordering
            assert ordering is not None, (
                'Using cursor pagination, but no ordering attribute was declared '
                'on the pagination class.'
            )
            assert '__' not in ordering, (
                'Cursor pagination does not support double underscore lookups '
                'for orderings. Orderings should be an unchanging, unique or '
                'nearly-unique field on the model, such as "-created" or "pk".'
            )

        assert isinstance(ordering, (str, list, tuple)), (
            'Invalid ordering. Expected string or tuple, but got {type}'.format(
                type=type(ordering).__name__
            )
        )

        if isinstance(ordering, str):
            return (ordering,)
        return tuple(ordering)

    def encode_cursor(self, cursor):
        tokens = {}
        if cursor.offset != 0:
            tokens['o'] = str(cursor.offset)
        if cursor.reverse:
            tokens['r'] = '1'
        if cursor.position is not None:
            tokens['p'] = cursor.position

        querystring = parse.urlencode(tokens, doseq=True)
        encoded = b64encode(querystring.encode('ascii')).decode('ascii')
        
        return {super().cursor_query_param:encoded}