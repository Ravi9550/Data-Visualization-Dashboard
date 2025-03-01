from rest_framework import generics
from .models import Report
from .serializers import ReportSerializer
from django.shortcuts import render
from .filters import ReportFilter
from rest_framework import viewsets
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view


class ReportList(generics.ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

class ReportListCreate(generics.ListCreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

class ReportFilter(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ReportFilter


@api_view(['POST'])
def filter_data(request):
    filter_type = request.data.get('filter_type')
    unique_values = []

    if filter_type == 'country':
        unique_values = Report.objects.values_list('country', flat=True).distinct()
    elif filter_type == 'region':
        unique_values = Report.objects.values_list('region', flat=True).distinct()
    elif filter_type == 'topic':
        unique_values = Report.objects.values_list('topic', flat=True).distinct()
    elif filter_type == 'source':
        unique_values = Report.objects.values_list('source', flat=True).distinct()
    elif filter_type == 'sector':
        unique_values = Report.objects.values_list('sector', flat=True).distinct()
    else:
        return Response({"error": "Invalid filter type"}, status=400)

    return Response(unique_values)