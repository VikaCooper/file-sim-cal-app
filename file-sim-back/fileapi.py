from flask import Flask, jsonify
from flask import request
import json
import dboperations

app = Flask(__name__)


@app.route('/test')
def test():
    return jsonify(
        message='ok',
        data='test'
    )


@app.route('/login', methods=['GET', 'POST'])
def log_in():
    if request.method == 'POST':
        json_data = json.loads(request.get_data().decode("utf-8"))
        print(json_data)

        result = dboperations.log_in_data(json_data)

        if result:
            return jsonify(
                message='ok',
                data='logged successfully',
                result=True
            )
        else:
            return jsonify(
                message='password invalid',
                data='logged failed',
                result=False

            )
    else:
        pass


if __name__ == "__main__":
    app.run(debug=True)
