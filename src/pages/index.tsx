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
					Hello! Microsoft,<br></br>
					Hope you&apos;re doing great!<br></br><br></br>

					Heard that AI workloads are driving those electricity bills—and heat levels—through the roof.<br></br>
					What if I told you there&apos;s a solution that can cut costs, cool systems more efficiently, and even bring peace to your employees&apos; ears?<br></br><br></br>

					If you&apos;re up for it, I got two words for you:<br></br>
					<b>Immersion Cooling</b>.<br></br><br></br>

					The idea is simple yet powerful—immerse entire server racks in a non-conductive liquid that efficiently pulls heat away from the hardware.<br></br>
					No more fans screaming.<br></br>
					No more thermal throttling.<br></br>
					Just stable, silent, and scalable performance.<br></br><br></br>

					But how does it work?<br></br><br></br>

					There are two widely-accepted pathways to immersion cooling:<br></br>
					the <i>single-phase</i> or the <i>two-phase</i> immersion cooling system.<br></br><br></br>

					Want the deep dive? We&apos;ve got the math, science, and setup guides ready (LaTeX included—because some stories are best told in equations).<br></br><br></br>

					Join our <Link href="https://waitlist.justice.rest">waitlist</Link> or drop a line at <Link href="mailto:solomon@justice.rest">solomon@justice.rest</Link> — we&apos;re happy to chat.
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
