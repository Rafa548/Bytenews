from drf.models import CustomUser

def set_admin_flag():
    try:
        admin_user = CustomUser.objects.get(username='admin')
        admin_user.is_admin = True
        admin_user.save()
        print("Admin flag set successfully.")
    except CustomUser.DoesNotExist:
        print("Admin user does not exist.")

if __name__ == "__main__":
    set_admin_flag()