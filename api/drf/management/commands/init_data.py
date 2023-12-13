from django.core.management.base import BaseCommand
from drf.models import UserProfile, Comment, Interest, Author, Publisher, News, CustomUser


class Command(BaseCommand):
    help = 'Populate initial data'

    def handle(self, *args, **options):
        # Create 4 users with profiles
        for i in range(1, 5):
            user = CustomUser.objects.create(username=f'user{i}', email=f'user{i}@example.com')
            profile = UserProfile.objects.create(user=user)

        # Create 20 comments
        users = CustomUser.objects.all()[:4]  # Select the 4 users
        news_items = News.objects.all()[:30]  # Select the first 30 news items
        for news in news_items:
            for user in users:
                Comment.objects.create(user=user, news=news, text=f'Comment on {news.title} by {user.username}')

        # Create 5 interests
        for i in range(1, 6):
            Interest.objects.create(name=f'Interest{i}')

        # Create 3 authors
        users = CustomUser.objects.all()[:3]  # Select the first 3 users
        publishers = [Publisher.objects.create(name=f'Publisher{i}') for i in range(1, 6)]  # Create 5 publishers
        for user, publisher in zip(users, publishers):
            Author.objects.create(user=user, publisher=publisher)

        # Create 5 publishers
        for i in range(1, 6):
            Publisher.objects.create(name=f'Publisher{i}')

        # Create 30 news items
        authors = Author.objects.all()[:3]  # Select the first 3 authors
        for i in range(1, 31):
            author = authors[i % 3]  # Cycle through the 3 authors
            News.objects.create(title=f'Title {i}', content=f'Content {i}', published_by=author)

        self.stdout.write(self.style.SUCCESS('Data populated successfully.'))
