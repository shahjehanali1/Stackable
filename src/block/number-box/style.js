import * as deepmerge from 'deepmerge'
import {
	createBackgroundStyleSet,
	createTypographyStyles,
	marginLeftAlign,
	marginRightAlign,
	whiteIfDark,
	whiteIfDarkBlackIfLight,
} from '@stackable/util'
import { applyFilters } from '@wordpress/hooks'
import { sprintf } from '@wordpress/i18n'

export const createStyles = props => {
	const getValue = ( attrName, format = '' ) => {
		const value = typeof props.attributes[ attrName ] === 'undefined' ? '' : props.attributes[ attrName ]
		return value !== '' ? ( format ? sprintf( format, value ) : value ) : undefined
	}

	const {
		design = 'basic',
		columnBackgroundColor = '',
		numberStyle = '',
	} = props.attributes

	const show = applyFilters( 'stackable.number-box.edit.show', {
		backgroundColor: design !== 'plain',
		borderRadius: design !== 'plain',
		shadow: design !== 'plain',
		numberColor: true,
		numberBGColor: ( design === 'basic' || design === 'plain' ) && numberStyle !== 'none',
		numberStyle: true,
		columnBackground: design !== 'plain',
	}, design, props )

	// General.
	const {
		contentAlign = '',
		borderRadius = 12,
		tabletContentAlign = '',
		mobileContentAlign = '',
	} = props.attributes
	const general = {
		'.ugb-number-box__item': {
			borderRadius: design !== 'plain' && borderRadius !== 12 ? `${ borderRadius }px` : undefined,
			textAlign: getValue( 'contentAlign' ),
		},
		tablet: {
			'.ugb-number-box__item': {
				textAlign: getValue( 'tabletContentAlign' ),
			},
		},
		mobile: {
			'.ugb-number-box__item': {
				textAlign: getValue( 'mobileContentAlign' ),
			},
		},
	}

	// Column Background.
	const columnBackground = {
		...( show.columnBackground ? createBackgroundStyleSet( 'column%s', 'ugb-number-box__item', props.attributes ) : {} ),
	}

	// Number
	const {
		numberBGColor = '',
		numberColor = '',
		numberAlign = '',
		numberTabletAlign = '',
		numberMobileAlign = '',
	} = props.attributes
	const number = {
		'.ugb-number-box__number': {
			...createTypographyStyles( 'number%s', 'desktop', props.attributes ),
			backgroundColor: show.numberBGColor && getValue( 'numberBGColor' ),
			height: show.numberBGColor && getValue( 'numberPadding', '%sem' ),
			width: show.numberBGColor && getValue( 'numberPadding', '%sem' ),
			lineHeight: show.numberBGColor && getValue( 'numberPadding', '%sem' ),
			marginLeft: numberAlign !== '' || contentAlign !== '' ? marginLeftAlign( numberAlign || contentAlign ) : undefined,
			marginRight: numberAlign !== '' || contentAlign !== '' ? marginRightAlign( numberAlign || contentAlign ) : undefined,
			textAlign: getValue( 'numberAlign' ),
			color: whiteIfDarkBlackIfLight( numberColor, show.numberBGColor && numberBGColor ),
			// Special case for centering the text with letter-spacing.
			textIndent: ( design === 'basic' || design === 'plain' ) && getValue( 'numberLetterSpacing', '%spx' ),
		},
		tablet: {
			'.ugb-number-box__number': {
				height: show.numberBGColor && getValue( 'numberTabletPadding', '%sem' ),
				width: show.numberBGColor && getValue( 'numberTabletPadding', '%sem' ),
				lineHeight: show.numberBGColor && getValue( 'numberTabletPadding', '%sem' ),
				marginLeft: numberTabletAlign !== '' && tabletContentAlign !== '' ? marginLeftAlign( numberTabletAlign || tabletContentAlign ) : undefined,
				marginRight: numberTabletAlign !== '' && tabletContentAlign !== '' ? marginRightAlign( numberTabletAlign || tabletContentAlign ) : undefined,
				textAlign: getValue( 'numberTabletAlign' ),
			},
		},
		mobile: {
			'.ugb-number-box__number': {
				height: show.numberBGColor && getValue( 'numberMobilePadding', '%sem' ),
				width: show.numberBGColor && getValue( 'numberMobilePadding', '%sem' ),
				lineHeight: show.numberBGColor && getValue( 'numberMobilePadding', '%sem' ),
				marginLeft: numberMobileAlign !== '' && mobileContentAlign !== '' ? marginLeftAlign( numberMobileAlign || mobileContentAlign ) : undefined,
				marginRight: numberMobileAlign !== '' && mobileContentAlign !== '' ? marginRightAlign( numberMobileAlign || mobileContentAlign ) : undefined,
				textAlign: getValue( 'numberMobileAlign' ),
			},
		},
	}
	const {
		titleColor = '',
	} = props.attributes
	const title = {
		'.ugb-number-box__title': {
			...createTypographyStyles( 'title%s', 'desktop', props.attributes ),
			color: whiteIfDark( titleColor, columnBackgroundColor ),
			textAlign: getValue( 'titleAlign' ),
		},
		tablet: {
			'.ugb-number-box__title': {
				...createTypographyStyles( 'title%s', 'tablet', props.attributes ),
				textAlign: getValue( 'titleTabletAlign' ),
			},
		},
		mobile: {
			'.ugb-number-box__title': {
				...createTypographyStyles( 'title%s', 'mobile', props.attributes ),
				textAlign: getValue( 'titleMobileAlign' ),
			},
		},
	}

	const {
		descriptionColor = '',
	} = props.attributes
	const description = {
		'.ugb-number-box__description': {
			...createTypographyStyles( 'description%s', 'desktop', props.attributes ),
			color: whiteIfDark( descriptionColor, columnBackgroundColor ),
			textAlign: getValue( 'descriptionAlign' ),
		},
		tablet: {
			'.ugb-number-box__description': {
				...createTypographyStyles( 'description%s', 'tablet', props.attributes ),
				textAlign: getValue( 'descriptionTabletAlign' ),
			},
		},
		mobile: {
			'.ugb-number-box__description': {
				...createTypographyStyles( 'description%s', 'mobile', props.attributes ),
				textAlign: getValue( 'descriptionMobileAlign' ),
			},
		},
	}

	const spacing = {
		'.ugb-number-box__number': {
			marginBottom: getValue( 'numberBottomMargin', '%spx' ),
		},
		'.ugb-number-box__title': {
			marginBottom: getValue( 'titleBottomMargin', '%spx' ),
		},
		tablet: {
			'.ugb-number-box__number': {
				marginBottom: getValue( 'numberTabletBottomMargin', '%spx' ),
			},
			'.ugb-number-box__title': {
				marginBottom: getValue( 'titleTabletBottomMargin', '%spx' ),
			},
		},
		mobile: {
			'.ugb-number-box__number': {
				marginBottom: getValue( 'numberMobileBottomMargin', '%spx' ),
			},
			'.ugb-number-box__title': {
				marginBottom: getValue( 'titleMobileBottomMargin', '%spx' ),
			},
		},
	}

	const individual = {
		'.ugb-number-box__item1': {
			backgroundColor: getValue( 'Column1BackgroundColor' ),
		},
		'.ugb-number-box__item1:before': {
			background: getValue( 'Column1BackgroundColor' ),
		},
		'.ugb-number-box__item2': {
			backgroundColor: getValue( 'Column2BackgroundColor' ),
		},
		'.ugb-number-box__item2:before': {
			background: getValue( 'Column2BackgroundColor' ),
		},
		'.ugb-number-box__item3': {
			backgroundColor: getValue( 'Column3BackgroundColor' ),
		},
		'.ugb-number-box__item3:before': {
			background: getValue( 'Column3BackgroundColor' ),
		},

		'.ugb-number-box__item1 .ugb-number-box__number': {
			backgroundColor: show.numberBGColor && getValue( 'Column1NumberBackgroundColor' ),
			color: getValue( 'Column1NumberColor' ),
		},
		'.ugb-number-box__item2 .ugb-number-box__number': {
			backgroundColor: show.numberBGColor && getValue( 'Column2NumberBackgroundColor' ),
			color: getValue( 'Column2NumberColor' ),
		},
		'.ugb-number-box__item3 .ugb-number-box__number': {
			backgroundColor: show.numberBGColor && getValue( 'Column3NumberBackgroundColor' ),
			color: getValue( 'Column3NumberColor' ),
		},

		'.ugb-number-box__item1 .ugb-number-box__title': {
			color: getValue( 'Column1TitleColor' ),
		},
		'.ugb-number-box__item2 .ugb-number-box__title': {
			color: getValue( 'Column2TitleColor' ),
		},
		'.ugb-number-box__item3 .ugb-number-box__title': {
			color: getValue( 'Column3TitleColor' ),
		},

		'.ugb-number-box__item1 .ugb-number-box__description': {
			color: getValue( 'Column1DescriptionColor' ),
		},
		'.ugb-number-box__item2 .ugb-number-box__description': {
			color: getValue( 'Column2DescriptionColor' ),
		},
		'.ugb-number-box__item3 .ugb-number-box__description': {
			color: getValue( 'Column3DescriptionColor' ),
		},
	}

	return deepmerge.all( [ general, columnBackground, number, title, description, spacing, individual ] )
}

export default createStyles
