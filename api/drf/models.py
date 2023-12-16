from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    is_admin = models.BooleanField(default=False)
    is_author = models.BooleanField(default=False)  
    # Custom related_name for groups and user_permissions
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def save(self, *args, **kwargs):
        # Check if the user is being created and is not saved yet
        if not self.pk:
            # Set default roles for a new user
            self.is_admin = False
            self.is_author = False
            # Perform other operations specific to new user creation

        super().save(*args, **kwargs)
    def save_as_author(self, *args, **kwargs):
        self.is_author = True
        self.save(*args, **kwargs)

    def save_as_admin(self, *args, **kwargs):
        self.is_admin = True
        self.save(*args, **kwargs)

class Interest(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    saved_news = models.ManyToManyField('News', blank=True, related_name='saved_by')
    interests = models.ManyToManyField(Interest, blank=True)

class Publisher(models.Model):
    name = models.CharField(max_length=100, unique=True)
    # Other attributes specific to publishers/entities, if needed

class Author(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    # Other attributes specific to authors, if needed


class News(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    content = models.TextField()
    published_by = models.ForeignKey(Author, on_delete=models.SET_NULL, null=True, related_name='published_news')
    tags = models.ManyToManyField(Interest, blank=True)

    # Other fields related to news

    def __str__(self):
        return self.title

class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    news = models.ForeignKey(News, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
