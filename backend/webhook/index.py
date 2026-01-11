import json
import os
import urllib.request
import urllib.parse

def handler(event: dict, context) -> dict:
    '''Webhook для обработки уведомлений об оплате от ЮMoney и отправки звёзд через Telegram'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        operation_label = body.get('label', '')
        amount = body.get('amount', 0)
        
        if not operation_label:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Missing label'}),
                'isBase64Encoded': False
            }
        
        payment_data = json.loads(operation_label)
        telegram_username = payment_data.get('telegram', '')
        stars = payment_data.get('stars', 0)
        
        if not telegram_username:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Missing telegram username'}),
                'isBase64Encoded': False
            }
        
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
        
        if not bot_token:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Bot token not configured'}),
                'isBase64Encoded': False
            }
        
        username_clean = telegram_username.replace('@', '')
        
        message = f"🌟 Ваш заказ выполнен!\n\nВы получили {stars} звёзд.\n\nСпасибо за покупку! ✨"
        
        telegram_api_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        
        data = {
            'chat_id': f'@{username_clean}',
            'text': message
        }
        
        req = urllib.request.Request(
            telegram_api_url,
            data=json.dumps(data).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        
        with urllib.request.urlopen(req) as response:
            telegram_response = json.loads(response.read().decode('utf-8'))
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Stars sent successfully',
                'telegram_response': telegram_response
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }