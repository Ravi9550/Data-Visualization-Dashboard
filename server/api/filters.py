# filters.py
import django_filters
from .models import Report

class ReportFilter(django_filters.FilterSet):
    class Meta:
        model = Report
        fields = {
            'end_year': ['exact', 'icontains', 'gte', 'lte'],
            'region': ['exact', 'icontains'],
            "sector":['exact', 'icontains'],
            "country" :['exact', 'icontains'],
            "end_year":['exact', 'gte', 'lte'],
            "intensity":['exact'],
            "sector":['exact'],
            "topic":['exact'],
            "insight":['exact'],
            "url":['exact'],
            "region":['exact'],
            "start_year":['exact', 'gte', 'lte'],
            "impact":['exact'],
            "added":['exact'],
            "published":['exact'],
            "country":['exact'],
            "relevance":['exact'],
            "pestle":['exact'],
            "source":['exact'],
            "title":['exact'],
            "likelihood":['exact'],
        }
