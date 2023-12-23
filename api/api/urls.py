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
    path('login', views.login), # POST /login/  login a user
    path('register',views.register), # POST /register/  register a new user
    path('news/', views.news_list), # GET, POST /news/  get all news, create a new news
    path('news/<int:id>', views.news_detail),   # GET, PUT, DELETE /news/<id>  get, update, delete a news
    path('news/<int:news_id>/comments/', views.comments_by_news), # GET, POST /news/<id>/comments/  get all comments of a news, create a new comment
    path('news/<int:news_id>/comment/', views.comment_news), # GET, POST /news/<id>/comment/  get all comments of a news, create a new comment
    path('news/comments/<int:comment_id>', views.delete_comment),   # GET, PUT, DELETE /news/comments/<id>  get, update, delete a comment
    path('news/interest/<int:id>', views.news_by_interest), # GET /news/interest/<id>  get all news by interest
    path('users/', views.user_list), # GET, POST /user/  get all users, create a new user')
    path('users/<int:id>', views.user_detail),   # GET, PUT, DELETE /user/<id>  get, update, delete a user
    path('users/<int:id>/news/', views.news_by_user), # GET /user/<id>/news/  get all news saved by user
    path('authors/', views.author_list), # GET, POST /author/  get all authors, create a new author
    path('authors/<int:id>', views.author_detail),   # GET, PUT, DELETE /author/<id>  get, update, delete an author
    path('authors/<int:author_id>/news/', views.news_by_author), # GET /author/<id>/news/  get all news by author
    path('authors/user/<int:user_id>', views.author_by_user), # GET author by user id
    path('publishers/', views.publisher_list), # GET, POST /publisher/  get all publishers, create a new publisher
    path('publishers/<int:id>', views.publisher_detail),   # GET, PUT, DELETE /publisher/<id>  get, update, delete a publisher
    path('interests/', views.interests_list), # GET, POST /interest/  get all interests, create a new interest
    path('interests/<int:id>', views.interest_detail),   # GET, PUT, DELETE /interest/<id>  get, update, delete an interest
    path('publishers/<int:id>/authors/', views.authors_by_publisher), # GET /publisher/<id>/authors/  get all authors by publisher
    path('user/<int:user_id>/save_news/<int:news_id>/', views.save_news), # GET /user/<id>/news/  get all news saved by user
    path('user/<int:user_id>/unsave_news/<int:news_id>/', views.unsave_news), # GET /user/<id>/news/  get all news saved by user
    path('user/<int:user_id>/saved_news/', views.news_by_user), # GET /user/<id>/news/  get all news saved by user
    path('interests/', views.interests_list), # GET, POST /interest/  get all interests, create a new interest
    path('interests/<int:id>', views.interest_detail),   # GET, PUT, DELETE /interest/<id>  get, update, delete an interest
    path('comments/', views.comments_list), # GET, POST /comment/  get all comments, create a new comment
    path('comments/<int:id>', views.comment_detail),   # GET, PUT, DELETE /comment/<id>  get, update, delete a comment
    path('comments/user/<int:id>', views.comments_by_user), # GET /comment/user/<id>  get all comments by user
    path('admin/add_user', views.registerByAdmin), # GET /admin/add_user  add a user')
]
