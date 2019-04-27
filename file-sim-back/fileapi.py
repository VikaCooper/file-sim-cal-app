from flask import Flask,jsonify

app = Flask(__name__)

@app.route('/test')
def test():
    return jsonify(
        message='ok',
        data= 'test'
    )

if __name__ == "__main__":
    app.run(debug=True)