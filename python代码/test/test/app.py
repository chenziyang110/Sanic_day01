from celery_task.celery import app
from celery_task import tasks

# 立即告知celery去执行add任务，并传入两个参数


@app.task(ignore_result=True)
def schedule_task(path,param=()):
    print(app.send_task(path,
                        args=param,
                        ).id)


# schedule_task("celery_task.tasks.add", ["asdasdasd","123123123123"])

result = tasks.add.delay({"asdasdasd":"123123123123"})
# print(result.id)