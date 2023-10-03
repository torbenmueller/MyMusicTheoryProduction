exports.getTitle = (req, res, next) => {
	const title = {
		title: 'Survey'
	}
	res.status(200).json({
		message: 'Title fetched successfully!',
		title: title
	})
}