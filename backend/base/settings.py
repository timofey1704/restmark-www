from pathlib import Path
import os
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# BASE_URL = 'http://127.0.0.1:8000'
BASE_URL = 'https://restmark.by'




# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "'django-insecure-1#6wqu@+78oqip*b%t=)5--brj$@@=&39m!7($r6m&t#utzr0g'"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost:3000', 'restmark.by', 'www.restmark.by', '127.0.0.1', 'restmark-api-app', 'exp://192.168.0.20:8081', 'http://localhost:8081']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'shop.apps.ShopConfig',
    'api.apps.ApiConfig',
    'tastypie',
    'corsheaders',
    # 'django.contrib.sites',
    'adminsortable2',
]

SITE_ID = 1

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'base.urls'

CSRF_TRUSTED_ORIGINS = [
    'https://restmark.by',
    'http://restmark.by',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'base.wsgi.application'



CORS_ALLOW_CREDENTIALS = True  # для разрешения cookie

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://restmark.by",
]


CORS_ALLOW_METHODS = [
    "GET",
    "POST",
    "HEAD"
    "PUT",
    "DELETE",
    "OPTIONS",
    "PATCH"
]


CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
    'https://restmark.by',
]

CORS_ALLOW_ALL_ORIGINS = False  # запрет всех доменов, кроме whitelist


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=BASE_DIR / '.env')

# проверяем подключение
# print("DB_NAME:", os.environ.get("DB_NAME"))
# print("DB_USER:", os.environ.get("DB_USER"))
# print("DB_PASSWORD:", os.environ.get("DB_PASSWORD"))
# print("DB_HOST:", os.environ.get("DB_HOST"))
# print("DB_PORT:", os.environ.get("DB_PORT"))

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("DB_NAME"),
        "USER": os.environ.get("DB_USER"),
        "PASSWORD": os.environ.get("DB_PASSWORD"),
        "HOST": os.environ.get("DB_HOST"),
        "PORT": os.environ.get("DB_PORT"),
    }
}

#TELEGRAM BOT
BOT_TOKEN = os.environ.get("BOT_TOKEN")
CHAT_ID = os.environ.get("CHAT_ID")

#директория для фоток
MEDIA_URL = '/media/'
MEDIA_ROOT = '/root/restmark/uploads/'
# MEDIA_ROOT = '/Users/timofey/Desktop/restmark-www/'



# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'
LANGUAGES = [
    ('en', 'English'),
    ('ru', 'Russian'),
]

TIME_ZONE = 'Etc/GMT-3'

USE_I18N = True

USE_L10N = True



# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'