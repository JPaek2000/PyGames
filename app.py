# app.py
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/TicTacToe')
def TicTacToe():
    return render_template('tictactoe.html')

@app.route('/Breakout')
def Breakout():
    return render_template('breakout.html')

# Add more routes for other games

if __name__ == '__main__':
    app.run(debug=True)