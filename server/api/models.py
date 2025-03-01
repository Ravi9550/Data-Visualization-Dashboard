from django.db import models
import datetime

class Report(models.Model):
    end_year = models.CharField(max_length=4, blank=True, null=True)
    intensity = models.CharField(max_length=10, blank=True, null=True)  # Changed to CharField
    sector = models.CharField(max_length=100,blank=True,null=True)
    topic = models.CharField(max_length=100,blank=True,null=True)
    insight = models.TextField()
    url = models.URLField()
    region = models.CharField(max_length=100)
    start_year = models.CharField(max_length=4, blank=True, null=True)
    impact = models.CharField(max_length=100, blank=True, null=True)
    added = models.DateTimeField(blank=True, null=True)
    published = models.DateTimeField(blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    relevance = models.IntegerField(blank=True, null=True)
    pestle = models.CharField(max_length=100,blank=True,null=True)
    source = models.CharField(max_length=100)
    title = models.TextField()
    likelihood = models.IntegerField( blank=True, null=True)
    

    def save(self, *args, **kwargs):
        # Convert custom date format to ISO 8601 before saving
        if isinstance(self.added, str):
            self.added = datetime.strptime(self.added, "%B, %d %Y %H:%M:%S")
        if isinstance(self.published, str):
            self.published = datetime.strptime(self.published, "%B, %d %Y %H:%M:%S")
        super().save(*args, **kwargs)
    def __str__(self):
        return self.title
    
    


