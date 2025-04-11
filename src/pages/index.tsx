import type { GetStaticProps } from 'next'
import * as React from 'react'
import { Container, Heading, Link, Text } from 'theme-ui'
import getStats, { Book, Stats } from '../lib/getStats'
import pluralize from '../lib/pluralize'

interface ValueCountProps {
	value: number
	singular: string
	plural: string
}

const ValueCount: React.FC<ValueCountProps> = ({ value, singular, plural }) => (
	<React.Fragment>
		{value.toLocaleString()} {pluralize(value, singular, plural)}
	</React.Fragment>
)

interface FormattedBookProps {
	book: Book
}

const FormattedBook: React.FC<FormattedBookProps> = ({ book }) => (
	<React.Fragment>
		&ldquo;{book.name}&rdquo; by {book.author}
	</React.Fragment>
)

interface BooksToSentenceProps {
	books: Array<Book>
}

const BooksToSentence: React.FC<BooksToSentenceProps> = ({ books }) => {
	if (books.length === 1) return <FormattedBook book={books[0]} />

	if (books.length === 2)
		return (
			<React.Fragment>
				<FormattedBook book={books[0]} /> and <FormattedBook book={books[1]} />
			</React.Fragment>
		)

	return (
		<React.Fragment>
			{books.map((book, index) => {
				if (index === 0) return <FormattedBook book={book} />

				if (index + 1 === books.length) {
					return (
						<React.Fragment>
							, and <FormattedBook book={book} />
						</React.Fragment>
					)
				}

				return (
					<React.Fragment key={book.name}>
						, <FormattedBook book={book} />
					</React.Fragment>
				)
			})}
		</React.Fragment>
	)
}

interface IndexProps {
	stats: Stats
}

const IndexPage: React.FC<IndexProps> = ({ stats }) => {
	const {
		commits = 0,
		tweets = 0,
		steps = 0,
		places = 0,
		songs = 0,
		album = null,
		books = [],
	} = stats

	return (
		<Container>
			<Text as="p" variant="section-heading" mb={3}>
				Introduction
			</Text>

			<Text as="div" variant="site-intro" sx={{ display: 'contents' }}>
				<Heading as="h1" variant="site-intro" sx={{ fontWeight: 'bold' }}>
					A letter to Microsoft&apos;s Azure
					<Link href="/trade" sx={{ textDecoration: 'none' }}>
						<span role="img" aria-label="palm tree emoji">🌴</span>
					</Link> 
				</Heading>
				<br></br><br></br>

				<Text as="p" variant="site-intro">
					Hello! Microsoft,
					<br></br>
					<br></br>
					Hope you&apos;re doing great!<br></br><br></br>

					Heard you needed some help with that electricity bill of yours?
					<br></br>
					<br></br>
					Let me guess, those beefy GPU&apos;s is sucking more electricity than you&apos;d want it?
					<br></br>
					<br></br>
					Oh! Wait, is it also actively blowing up your employee&apos;s ears and also giving them a heat stroke?
					<br></br>
					<br></br>
					Well, Good Sir, what if I told you there&apos;s a system that can cut down the costs (especially in this economy), cool these servers, and not actively hunt down your employees?<br></br><br></br>

					If you&apos;re up for it, I have two words:<br></br>
					<b>Immersion Cooling</b>.<br></br><br></br>

					The idea is simple yet powerful—immerse entire server racks in a certain type of liquid that efficiently pulls heat away from the hardware.
					<br></br>
					<br></br>
					Before you jump on me, trust me−I am not crazy, it works & I got proof (LaTeX included—because some stories are best told in equations)🫡
					<br></br>
					<br></br>
					Read it <a href="https://docs.google.com/document/d/1tY8X07giti0q_EicZRikaBbr_Mz_49_M1UBKemJxldY/edit?usp=sharing">here</a> 👀
					<br></br>
					<br></br>
					P.S. The source code for this site can be found <a href="https://github.com/solomonshalom/lettertomicrosoft.xyz">here</a>
					<br></br>
					<br></br>
					With Warm Regards,
					<br></br>
					<a href="https://solomonlijo.com">Solomon Shalom Lijo</a>
				</Text>
			</Text>
		</Container>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const stats = await getStats()

	return {
		props: {
			stats,
		},
		revalidate: 60 * 60, // revalidate at most once per hour
	}
}

export default IndexPage
