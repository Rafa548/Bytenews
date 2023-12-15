"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from drf import views

urlpatterns = [
    path('news/', views.news_list), # GET, POST /news/  get all news, create a new news
    path('news/<int:id>', views.news_detail),   # GET, PUT, DELETE /news/<id>  get, update, delete a news
    path('users/', views.user_list), # GET, POST /user/  get all users, create a new user')
    path('users/<int:id>', views.user_detail),   # GET, PUT, DELETE /user/<id>  get, update, delete a user
    path('authors/', views.author_list), # GET, POST /author/  get all authors, create a new author
    path('authors/<int:id>', views.author_detail),   # GET, PUT, DELETE /author/<id>  get, update, delete an author
    path('publishers/', views.publisher_list), # GET, POST /publisher/  get all publishers, create a new publisher
    path('publishers/<int:id>', views.publisher_detail),   # GET, PUT, DELETE /publisher/<id>  get, update, delete a publisher




    path('published_news/user/<int:author_id>/', views.news_by_author, name='news_by_author'),
    path('saved_news/user/<int:user_id>/', views.news_by_user, name='news_by_user'),
    path('login', views.login, name='login'),
]
