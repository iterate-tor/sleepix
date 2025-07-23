from backend.app.tasks.wearables import celery_app

# This exposes `celery_app` as `app` for `celery -A backend.worker worker`
app = celery_app 