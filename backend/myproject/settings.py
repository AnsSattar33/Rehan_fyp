from pathlib import Path
import os
from datetime import timedelta

# Define BASE_DIR using Path
BASE_DIR = Path(__file__).resolve().parent.parent

# Static files settings
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
    
]

ROOT_URLCONF = 'myproject.urls'  # Replace 'myproject' with the name of your project


# Database settings (you already have this)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'product_data',  # Replace with your database name
        'USER': 'postgres',  # Replace with your PostgreSQL username
        'PASSWORD': 'Rehan123',  # Replace with your PostgreSQL password
        'HOST': 'localhost',  # PostgreSQL default host
        'PORT': '5432',  # PostgreSQL default port
    }
}

# Installed apps section (add this below or anywhere in the settings file)
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',  # If using CORS
    'rest_framework',
    'rest_framework_simplejwt',  # Add this line for Django REST Framework
    'myapp',  # Your custom app
    
]
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  # Token expiration time
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,
}

SECRET_KEY = '9a7-$d23l#8kw+n!+i1$o2e27xgf=%jc@essper5wnl4r$xx)z'

# TEMPLATES setting
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # Define the directories if needed
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

# MIDDLEWARE setting
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',  # This is required
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # This is required
    'django.contrib.messages.middleware.MessageMiddleware',  # This is required
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Enable CORS middleware
]

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',  # Default backend
]


# CORS settings to allow your React app to communicate with Django API
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # URL of your React app (Vite)
]

CORS_ALLOW_ALL_ORIGINS = True

# Set the default auto field for primary keys
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Allowed hosts for the Django app
ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

# Enable debug mode for development
DEBUG = True

# Media files settings for file upload handling
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'  # Proper path to store media files

# Security settings (for production, adjust accordingly)
SECURE_SSL_REDIRECT = False
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False
