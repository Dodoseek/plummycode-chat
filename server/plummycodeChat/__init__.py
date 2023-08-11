# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
import logging

from celery import app as celery_app
from sorl.thumbnail.log import ThumbnailLogHandler

__all__ = ('celery_app',)

handler = ThumbnailLogHandler()
handler.setLevel(logging.ERROR)
logging.getLogger('sorl.thumbnail').addHandler(handler)
