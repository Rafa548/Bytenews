from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf.serielizers import NewsSerializer, CommentSerializer, UserProfileSerializer, CustomUserSerializer, InterestSerializer, PublisherSerializer, AuthorSerializer
from drf.models import News, CustomUser, Interest, UserProfile, Publisher, Author, Comment
from django.contrib.auth import authenticate


@api_view(['GET', 'POST'])
def news_list(request):
    """
    List all news, or create a new news.
    """
    if request.method == 'GET':
        news = News.objects.all()
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = NewsSerializer(data=request.data)
        if serializer.is_valid():
            published_by_id = request.data.get('published_by', {})
            author = Author.objects.get(id=published_by_id)
            serializer.save(published_by=author)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def news_detail(request, id):
    """
    Retrieve, update or delete a news instance.
    """
    try:
        news = News.objects.get(id=id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NewsSerializer(news)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = NewsSerializer(news, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        news.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def user_list(request):
    """
    List all users, or create a new user.
    """
    if request.method == 'GET':
        users = CustomUser.objects.all()
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, id):
    """
    Retrieve, update or delete a user instance.
    """
    try:
        user = CustomUser.objects.get(id=id)
    except CustomUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CustomUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def author_list(request):
    """
    List all authors, or create a new author.
    """
    if request.method == 'GET':
        authors = Author.objects.all()
        serializer = AuthorSerializer(authors, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AuthorSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def author_detail(request, id):
    """
    Retrieve, update or delete a author instance.
    """
    try:
        author = Author.objects.get(id=id)
    except Author.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AuthorSerializer(author)
        return Response(serializer.data)

    elif request.method == 'PUT':

       try :
            print(request.data)
            author = Author.objects.get(id=request.data['id'])
       except Author.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
       serializer = AuthorSerializer(author, data=request.data)
       #print(serializer.is_valid())
       if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        author.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def author_by_user(request, user_id):
    """
    Retrieve an author by user ID.
    """
    try:
        author = Author.objects.get(user=user_id)
    except Author.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AuthorSerializer(author)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
def publisher_list(request):
    """
    List all publishers, or create a new publisher.
    """
    if request.method == 'GET':
        publishers = Publisher.objects.all()
        serializer = PublisherSerializer(publishers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PublisherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def publisher_detail(request, id):
    """
    Retrieve, update or delete a publisher instance.
    """
    try:
        publisher = Publisher.objects.get(id=id)
    except Publisher.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PublisherSerializer(publisher)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PublisherSerializer(publisher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        publisher.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def authors_by_publisher(request, id):
    """
    Retrieve all authors by a publisher.
    """
    try:
        authors = Author.objects.filter(publisher_id=id)
    except Author.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AuthorSerializer(authors, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = AuthorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(publisher_id=id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET', 'POST'])
def interests_list(request):
    """
    List all interests, or create a new interest.
    """
    if request.method == 'GET':
        interests = Interest.objects.all()
        serializer = InterestSerializer(interests, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = InterestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def interest_detail(request, id):
    """
    Retrieve, update or delete a interest instance.
    """
    try:
        interest = Interest.objects.get(id=id)
    except Interest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = InterestSerializer(interest)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = InterestSerializer(interest, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        interest.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def news_by_author(request, author_id):
    """
    Retrieve all news by an author.
    """
    try:
        news = News.objects.filter(published_by__id=author_id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)



@api_view(['GET'])
def news_by_publisher(request, publisher_id):
    """
    Retrieve all news by a publisher.
    """
    try:
        news = News.objects.filter(published_by__publisher_id=publisher_id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def news_by_interest(request, id):
    """
    Retrieve all news by an interest.
    """
    try:
        news = News.objects.filter(tags__id=id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)

@api_view(['GET']) #news salvas pelo user
def news_by_user(request, id):
    """
    Retrieve all news by a user.
    """
    try:
        news = News.objects.filter(saved_by__user_id=id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)

@api_view(['GET']) #maybe
def news_by_user_interest(request, user_id, interest_id):
    """
    Retrieve all news by a user and interest.
    """
    try:
        news = News.objects.filter(saved_by__user_id=user_id, interests__id=interest_id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)

@api_view(['GET']) #filtro
def news_by_user_publisher(request, user_id, publisher_id):
    """
    Retrieve all news by a user and publisher.
    """
    try:
        news = News.objects.filter(saved_by__user_id=user_id, published_by__publisher_id=publisher_id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)

@api_view(['GET']) #filtro
def news_by_user_publisher_interest(request, user_id, publisher_id, interest_id):
    """
    Retrieve all news by a user, publisher and interest.
    """
    try:
        news = News.objects.filter(saved_by__user_id=user_id, published_by__publisher_id=publisher_id, interests__id=interest_id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def save_news(request, news_id, user_id):
    """
    Save a news by a user.
    """
    try:
        news = News.objects.get(pk=news_id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        #user = request.user
        #user_profile = UserProfile.objects.get(user=user)request
        user_profile = UserProfile.objects.get(user_id=user_id)
        user_profile.saved_news.add(news)
        return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def unsave_news(request, news_id, user_id):
    """
    Unsave a news by a user.
    """
    try:
        news = News.objects.get(pk=news_id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        #user = request.user
        #user_profile = UserProfile.objects.get(user=user)
        user_profile = UserProfile.objects.get(user_id=user_id)
        user_profile.saved_news.remove(news)
        return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def comments_list(request):
    """
    Retrieve all comments.
    """
    try:
        comments = Comment.objects.all()
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

@api_view(['PUT', 'DELETE', 'GET'])
def comment_detail(request, comment_id):
    """
    Retrieve, update or delete a comment instance.
    """
    try:
        comment = Comment.objects.get(pk=comment_id)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def comments_by_news(request, news_id):
    """
    Retrieve all comments by a news.
    """
    try:
        comments = Comment.objects.filter(news_id=news_id)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def comment_news(request, news_id):
    """
    Comment on a news.
    """
    try:
        news = News.objects.get(pk=news_id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        user = request.data['user']
        user = CustomUser.objects.get(pk=user)
        text = request.data['text']
        comment = Comment(user=user, news=news, text=text)
        comment.save()
        return Response(status=status.HTTP_200_OK)
    
@api_view(['DELETE'])
def delete_comment(request, comment_id):
    """
    Delete a comment.
    """
    try:
        comment = Comment.objects.get(pk=comment_id)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_200_OK)
    

@api_view(['GET'])
def comments_by_user(request, id):
    """
    Retrieve all comments by a user.
    """
    try:
        comments = Comment.objects.filter(user=id)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    

@api_view(['GET']) #apagar talvez
def comments_by_user_news(request, user_id, news_id):
    """
    Retrieve all comments by a user and news.
    """
    try:
        comments = Comment.objects.filter(user_id=user_id, news_id=news_id)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

@api_view(['GET']) #apagar quase de ctz ok para testes
def user_profile(request, user_id):
    """
    Retrieve a user profile.
    """
    try:
        user_profile = UserProfile.objects.get(user_id=user_id)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)

@api_view(['GET'])
def user_profile_by_user(request):
    """
    Retrieve a user profile by user.
    """
    try:
        user_profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)

@api_view(['GET']) #para o author
def user_profile_by_news(request, news_id):
    """
    Retrieve a user profile by news.
    """
    try:
        user_profile = UserProfile.objects.get(saved_news__id=news_id)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)

@api_view(['GET'])
def user_profile_by_comment(request, comment_id):
    """
    Retrieve a user profile by comment.
    """
    try:
        user_profile = UserProfile.objects.get(comments__id=comment_id)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)

@api_view(['GET']) #inutil quase de ctz o do user ja faz isso
def user_profile_by_author(request, author_id):
    """
    Retrieve a user profile by author.
    """
    try:
        user_profile = UserProfile.objects.get(saved_news__published_by__user_id=author_id)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)


@api_view(['Post'])
def login(request):
    """
    Login a user.
    """
    if request.method == 'POST':
        username = request.data['username']
        password = request.data['password']
        #user = CustomUser.objects.get(username=username)
        user = authenticate(username=username, password=password)
        #print(user.password)
        if user != None:
            serializer = CustomUserSerializer(user)
            #if user.is_author:
                #author = Author.objects.get(user=user)
                #serializer = AuthorSerializer(author)
            #serializer = AuthorSerializer(user.author)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def register(request):
    """
    Register a user.
    """
    if request.method == 'POST':
        username = request.data['username']
        password = request.data['password']
        email = request.data['email']
        first_name = request.data['firstName']
        last_name = request.data['lastName']
        is_author = False
        is_admin = False
        user = CustomUser.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name,
            is_author=is_author,
            is_admin=is_admin
        )
        user_profile = UserProfile.objects.create(user=user)


        user_serializer = CustomUserSerializer(user)
        profile_serializer = UserProfileSerializer(user_profile)

        return Response(
            {'user': user_serializer.data, 'user_profile': profile_serializer.data},
            status=status.HTTP_201_CREATED
        )

    
@api_view(['GET', 'POST'])
def interests_list(request):
    """
    List all interests, or create a new interest.
    """
    if request.method == 'GET':
        interests = Interest.objects.all()
        serializer = InterestSerializer(interests, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = InterestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def interest_detail(request, id):
    """
    Retrieve, update or delete a interest instance.
    """
    try:
        interest = Interest.objects.get(id=id)
    except Interest.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = InterestSerializer(interest)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = InterestSerializer(interest, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        interest.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



