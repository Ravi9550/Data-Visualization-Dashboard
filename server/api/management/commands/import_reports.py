import json
from django.core.management.base import BaseCommand
from api.models import Report

class Command(BaseCommand):
    help = 'Import JSON data into the Report model'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='The path to the JSON file')

    def handle(self, *args, **kwargs):
        json_file = kwargs['json_file']
        with open(json_file, 'r') as file:
            data = json.load(file)
            for item in data:
                Report.objects.create(
                    end_year=item.get('end_year'),
                    intensity=item.get('intensity'),
                    sector=item.get('sector'),
                    topic=item.get('topic'),
                    insight=item.get('insight'),
                    url=item.get('url'),
                    region=item.get('region'),
                    start_year=item.get('start_year'),
                    impact=item.get('impact'),
                    added=item.get('added'),
                    published=item.get('published'),
                    country=item.get('country'),
                    relevance=item.get('relevance'),
                    pestle=item.get('pestle'),
                    source=item.get('source'),
                    title=item.get('title'),
                    likelihood=item.get('likelihood'),
                )
        self.stdout.write(self.style.SUCCESS('Successfully imported data'))
