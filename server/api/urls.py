from django.urls import path
from .views import ReportList, ReportListCreate, ReportFilter, filter_data


urlpatterns = [
    path('reports/', ReportList.as_view(), name='report-list'),
    path('reports/create', ReportListCreate.as_view(), name='report-list-create'),
    path('reports/filter', ReportFilter.as_view({'get': 'list'}), name='report-filter' ),
    path('reports/filtered_data/', filter_data, name='unique_countries'),
]
