from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf.serielizers import NewsSerializer, CommentSerializer, UserProfileSerializer, CustomUserSerializer, InterestSerializer, PublisherSerializer, AuthorSerializer
from drf.models import News, CustomUser, Interest, UserProfile, Publisher, Author, Comment


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
            serializer.save(published_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def news_detail(request, pk):
    """
    Retrieve, update or delete a news instance.
    """
    try:
        news = News.objects.get(pk=pk)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NewsSerializer(news)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = NewsSerializer(news, data=request.data)
        if serializer.is_valid():
            serializer.save(published_by=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        news.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def news_by_author(request, author_id):
    """
    Retrieve all news by an author.
    """
    try:
        news = News.objects.filter(published_by__user_id=author_id)
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
def news_by_interest(request, interest_id):
    """
    Retrieve all news by an interest.
    """
    try:
        news = News.objects.filter(interests__id=interest_id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)

@api_view(['GET']) #news salvas pelo user
def news_by_user(request, user_id):
    """
    Retrieve all news by a user.
    """
    try:
        news = News.objects.filter(saved_by__user_id=user_id)
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
def save_news(request, news_id):
    """
    Save a news by a user.
    """
    try:
        news = News.objects.get(pk=news_id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        user = request.user
        user_profile = UserProfile.objects.get(user=user)
        user_profile.saved_news.add(news)
        return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def unsave_news(request, news_id):
    """
    Unsave a news by a user.
    """
    try:
        news = News.objects.get(pk=news_id)
    except News.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        user = request.user
        user_profile = UserProfile.objects.get(user=user)
        user_profile.saved_news.remove(news)
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
        user = request.user
        text = request.data['text']
        comment = Comment(user=user, news=news, text=text)
        comment.save()
        return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def comments_by_user(request, user_id):
    """
    Retrieve all comments by a user.
    """
    try:
        comments = Comment.objects.filter(user_id=user_id)
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

@api_view(['GET']) #apagar talvez
def comments_by_user_publisher(request, user_id, publisher_id):
    """
    Retrieve all comments by a user and publisher.
    """
    try:
        comments = Comment.objects.filter(user_id=user_id, news__published_by__publisher_id=publisher_id)
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