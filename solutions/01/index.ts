const numberWords: Record<string, string> = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
}

const findMatches = (input: string) => {
    const words = [...Object.keys(numberWords), ...Object.values(numberWords)]
    const matches = []

    for (const word of words) {
        let pos = input.indexOf(word)
        while (pos !== -1) {
            matches.push({ word, pos })
            pos = input.indexOf(word, pos + 1)
        }
    }

    return matches.sort((a, b) => a.pos - b.pos)
}

const part1 = async () => {
    const input: string[] = (await Bun.file("input.txt").text()).split("\n")

    const total: number = input.reduce((accum: number, line: string): number => {
        const numbers: string[] = line.split("").filter((n: string) => !isNaN(parseInt(n)))
        return accum + parseInt(numbers[0] + numbers[numbers.length - 1])
    }, 0)

    console.log("Part 1:", total)
}

const part2 = async () => {
    const input: string[] = (await Bun.file("input.txt").text()).split("\n")

    const total: number = input.reduce((accum: number, line: string): number => {
        const matches = findMatches(line)
        if (!matches.length) return accum

        const firstMatch = matches[0].word
        const firstNumber = numberWords[firstMatch] || firstMatch

        const lastMatch = matches[matches.length - 1].word
        const lastNumber = numberWords[lastMatch] || lastMatch

        return accum + parseInt(firstNumber + lastNumber)
    }, 0)

    console.log("Part 2:", total)
}

part1()
part2()
