from app import create_app


app = create_app('config.development')
app.config['CORS_HEADERS'] = 'Content-Type'
if __name__ == '__main__':
    app.run()
