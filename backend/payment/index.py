import json
import os
from urllib.parse import urlencode

def handler(event: dict, context) -> dict:
    '''API для создания платежных ссылок ЮMoney'''
    
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
        package_name = body.get('packageName', '')
        price = body.get('price', 0)
        customer_name = body.get('customerName', '')
        customer_email = body.get('customerEmail', '')
        star_name = body.get('starName', '')
        
        receiver = os.environ.get('YOOMONEY_RECEIVER', '')
        
        if not receiver:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Payment system not configured'}),
                'isBase64Encoded': False
            }
        
        payment_params = {
            'receiver': receiver,
            'quickpay-form': 'shop',
            'targets': f'Покупка {package_name}',
            'paymentType': 'SB',
            'sum': price,
            'label': f'{customer_email}|{star_name}',
            'successURL': 'https://example.com/success'
        }
        
        payment_url = f'https://yoomoney.ru/quickpay/confirm.xml?{urlencode(payment_params)}'
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'paymentUrl': payment_url,
                'orderId': f'{customer_email}_{star_name}'
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
