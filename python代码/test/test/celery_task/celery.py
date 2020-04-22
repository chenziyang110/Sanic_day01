from celery import Celery

app = Celery('proj',
    broker="redis://:@127.0.0.1/8",
    backend="redis://:@127.0.0.1/9",
    include=['celery_task.tasks'],
)


# 时区
app.conf.timezone = 'Asia/Shanghai'
# 是否使用UTC
app.conf.enable_utc = False
