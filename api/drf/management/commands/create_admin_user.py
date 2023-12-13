from django.core.management.base import BaseCommand
from drf.models import CustomUser

class Command(BaseCommand):
    help = 'Create default admin user'

    def handle(self, *args, **options):
        # Check if the admin user exists
        if not CustomUser.objects.filter(username='admin').exists():
            # Create a new superuser
            CustomUser.objects.create_superuser('admin', 'admin@example.com', 'admin')
            CustomUser.objects.filter(username='admin').update(is_admin=True)
            self.stdout.write(self.style.SUCCESS('Default admin user created successfully.'))
        else:
            self.stdout.write(self.style.WARNING('Admin user already exists.'))
