def visPuzzle(puzzle):
    puzzle = puzzle.array()
    viz = ""
    for x in puzzle:
        for y in puzzle:
            viz = viz + "----"
    viz = viz + "-\n"
    for y in puzzle:
        viz = viz + "| " + puzzle[x][y] + " "
    viz = viz + "| " + "\n"
    for y in puzzle:
        viz = viz + "----"
    viz = viz + "-"
    return viz


def makeRows(row) :
    puzzle = puzzle.array()
    for x in range(4):
        puzzle.append(row.pop())
    return puzzle;

import array as row
row.array = [1,2,3,4]
puzzles = makeRows(row)
# print(type(row))
print(visPuzzle(puzzles))


