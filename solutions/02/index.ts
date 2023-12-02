type Game = { id: number; counts: number[][]; max: number[] }

const COLORS = ["red", "green", "blue"]
const BAG = [12, 13, 14]

const processRound = (round: string): number[] =>
    round.split(", ").reduce(
        (acc, pair: string) => {
            const [number, color] = pair.trim().split(" ")
            acc[COLORS.indexOf(color)] = (acc[COLORS.indexOf(color)] || 0) + Number(number)
            return acc
        },
        [0, 0, 0]
    )

const processGame = async (text: string): Promise<Game[]> =>
    text.split("\n").map((line) => {
        const { id, cubes } = line.match(/Game (?<id>\d+): (?<cubes>.*)/)!.groups!
        const counts = cubes.split("; ").map(processRound)
        const max = counts.reduce((acc, round) => acc.map((n, i) => Math.max(n, round[i])), [0, 0, 0])
        return { id: Number(id), counts, max }
    })

const calculateScorePart1 = (games: Game[]) => {
    // Sum all game ids where the max values are less than or equal to the bag
    return games.reduce((acc, game) => (game.max.every((count, i) => count <= BAG[i]) ? acc + game.id : acc), 0)
}

const calculateScorePart2 = (games: Game[]) => {
    // Multiply all max values together
    return games.reduce((acc, game) => acc + game.max.reduce((acc, value) => acc * value, 1), 0)
}

const part1 = async () => {
    const input: string = await Bun.file("input.txt").text()
    const games = await processGame(input)
    const total = calculateScorePart1(games)
    console.log("Part 1: ", total)
}

const part2 = async () => {
    const input: string = await Bun.file("input.txt").text()
    const games = await processGame(input)
    const total = calculateScorePart2(games)
    console.log("Part 2: ", total)
}

part1()
part2()
