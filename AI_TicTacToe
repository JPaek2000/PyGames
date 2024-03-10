import random

class TicTacToe:
    def __init__(self):
        self.current_player = "X"
        self.board = [" "] * 9
        self.is_human_vs_ai = False  # Default is human vs. human

    def print_board(self):
        for i in range(0, 9, 3):
            print(" | ".join(self.board[i:i + 3]))
            if i < 6:
                print("-" * 9)

    def make_move(self, position):
        if 1 <= position <= 9 and self.board[position - 1] == " ":
            self.board[position - 1] = self.current_player
            self.switch_player()
            return True
        else:
            print("Invalid move. Please try again.")
            return False

    def check_winner(self):
        for i in range(3):
            if self.board[i] == self.board[i + 3] == self.board[i + 6] != " ":
                return True
            if self.board[i * 3] == self.board[i * 3 + 1] == self.board[i * 3 + 2] != " ":
                return True
        if self.board[0] == self.board[4] == self.board[8] != " ":
            return True
        if self.board[2] == self.board[4] == self.board[6] != " ":
            return True
        return False

    def switch_player(self):
        self.current_player = "O" if self.current_player == "X" else "X"

    def make_ai_move(self):
        available_moves = [i + 1 for i in range(9) if self.board[i] == " "]
        if available_moves:
            return random.choice(available_moves)
        return None

    def reset_board(self):
        self.board = [" "] * 9

    def run(self):
        while True:
            self.print_board()

            if not self.is_human_vs_ai:
                position = int(input(f"Player {self.current_player}, enter your move (1-9): "))
                if not self.make_move(position):
                    continue
            else:
                if self.current_player == "X":
                    position = int(input("Player X, enter your move (1-9): "))
                    if not self.make_move(position):
                        continue
                else:
                    print("Player O (AI) is making a move.")
                    position = self.make_ai_move()
                    if position is not None:
                        print(f"Player O (AI) chooses position {position}.")
                        self.make_move(position)

            if self.check_winner():
                self.print_board()
                print(f"Player {'O' if self.current_player == 'X' else 'X'} wins!")
                play_again = input("Do you want to play again? (yes/no): ").lower()
                if play_again == "yes":
                    self.reset_board()
                    continue
                else:
                    break
            elif " " not in self.board:
                self.print_board()
                print("It's a tie!")
                play_again = input("Do you want to play again? (yes/no): ").lower()
                if play_again == "yes":
                    self.reset_board()
                    continue
                else:
                    break

if __name__ == "__main__":
    game = TicTacToe()
    opponent_choice = input("Choose opponent: (1) Human vs. Human, (2) Human vs. AI: ")

    if opponent_choice == "2":
        game.is_human_vs_ai = True

    game.run()