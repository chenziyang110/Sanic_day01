from celery_task.celery import app

from celery.result import AsyncResult

id = '32660ecf-58ce-498d-a36f-5773b320cd93'

async = AsyncResult(id=id, app=app)
if async.successful():
    result = async.get()
    print(result)
elif async.failed():
    print('任务失败')
    result = async._get_task_meta()['result']
    print(result)
elif async.status == 'PENDING':
    print('任务等待中被执行')
elif async.status == 'RETRY':
    print('任务异常后正在重试')
elif async.status == 'STARTED':
    print('任务已经开始被执行')