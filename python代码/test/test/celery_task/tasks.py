import time
from .celery import app


@app.task(ignore_result=True)
def schedule_task(path,param=()):
    app.send_task(path,
                  args=param,
                  )

@app.task(bind=True)
def add(self,a):
    print(a)
    schedule_task("celery_task.tasks.add2", (1,))
    return 6666

@app.task()
def add2(a):
    time.sleep(10)
    return 7777