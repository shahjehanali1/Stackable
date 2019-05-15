import { addFilter, applyFilters } from '@wordpress/hooks'
import {
	BlockContainer, ColorPaletteControl, DesignPanelBody, PanelDesignLibrary, PanelDesignUserLibrary, ProControlButton, FourNumberControl, WhenResponsiveScreen, AdvancedRangeControl, PanelAdvancedSettings, HeadingButtonsControl, AlignButtonsControl, PanelBackgroundSettings,
} from '@stackable/components'
import { descriptionPlaceholder, range } from '@stackable/util'
import { PanelBody, RangeControl, SelectControl, ToggleControl } from '@wordpress/components'
import { PanelColorSettings, RichText } from '@wordpress/editor'
import { withBlockStyles, withTabbedInspector, withUniqueClass } from '@stackable/higher-order'
import { __ } from '@wordpress/i18n'
import classnames from 'classnames'
import { compose } from '@wordpress/compose'
import createStyles from './style'
import { Fragment } from '@wordpress/element'
import ImageDesignBasic from './images/basic.png'
import ImageDesignPlain from './images/plain.png'
import { showProNotice } from 'stackable'

addFilter( 'stackable.number-box.edit.inspector.layout.before', 'stackable/number-box', ( output, props ) => {
	const { setAttributes } = props
	const {
		design = 'basic',
	} = props.attributes

	return (
		<Fragment>
			{ output }
			<DesignPanelBody
				initialOpen={ true }
				selected={ design }
				options={ [
					{
						image: ImageDesignBasic, label: __( 'Basic' ), value: 'basic',
					},
					{
						image: ImageDesignPlain, label: __( 'Plain' ), value: 'plain',
					},
					...applyFilters( 'stackable.number-box.edit.designs', [] ),
				] }
				onChange={ design => {
					setAttributes( { design } )
				} }
			>
				{ showProNotice && <ProControlButton /> }
			</DesignPanelBody>
			<PanelDesignLibrary block={ props.name } />
			<PanelDesignUserLibrary
				initialOpen={ false }
				block={ props.name }
				ignoredAttributes={ [] }
			/>
		</Fragment>
	)
} )

addFilter( 'stackable.number-box.edit.advanced.spacing.before', 'stackable/number-box', ( output, props ) => {
	const { setAttributes } = props
	const {
		columns = 2,
		columnGap = '',
		tabletColumnGap = '',
		mobileColumnGap = '',
		boxTopPadding = '',
		boxRightPadding = '',
		boxBottomPadding = '',
		boxLeftPadding = '',
		boxTabletTopPadding = '',
		boxTabletRightPadding = '',
		boxTabletBottomPadding = '',
		boxTabletLeftPadding = '',
		boxMobileTopPadding = '',
		boxMobileRightPadding = '',
		boxMobileBottomPadding = '',
		boxMobileLeftPadding = '',
	} = props.attributes

	return (
		<Fragment>
			{ output }
			<WhenResponsiveScreen>
				<FourNumberControl
					label={ __( 'Box Paddings' ) }
					top={ boxTopPadding }
					right={ boxRightPadding }
					bottom={ boxBottomPadding }
					left={ boxLeftPadding }
					onChange={ paddings => {
						setAttributes( {
							boxTopPadding: paddings.top !== '' ? parseInt( paddings.top, 10 ) : '',
							boxRightPadding: paddings.right !== '' ? parseInt( paddings.right, 10 ) : '',
							boxBottomPadding: paddings.bottom !== '' ? parseInt( paddings.bottom, 10 ) : '',
							boxLeftPadding: paddings.left !== '' ? parseInt( paddings.left, 10 ) : '',
						} )
					} }
				/>
			</WhenResponsiveScreen>
			<WhenResponsiveScreen screen="tablet">
				<FourNumberControl
					label={ __( 'Box Paddings' ) }
					// screens={ [ 'desktop', 'tablet', 'mobile' ] }
				/>
			</WhenResponsiveScreen>
			<WhenResponsiveScreen screen="mobile">
				<FourNumberControl
					label={ __( 'Box Paddings' ) }
					// screens={ [ 'desktop', 'tablet', 'mobile' ] }
				/>
			</WhenResponsiveScreen>
			{ columns > 1 && (
				<Fragment>
					<WhenResponsiveScreen>
						<AdvancedRangeControl
							label={ __( 'Column Gap' ) }
							min={ 0 }
							max={ 200 }
							value={ columnGap }
							onChange={ ( columnGap = 35 ) => setAttributes( { columnGap } ) }
							allowReset={ true }
						/>
					</WhenResponsiveScreen>
					<WhenResponsiveScreen screen="tablet">
						<AdvancedRangeControl
							label={ __( 'Column Gap' ) }
							min={ 0 }
							max={ 200 }
							value={ tabletColumnGap }
							onChange={ ( tabletColumnGap = 35 ) => setAttributes( { tabletColumnGap } ) }
							allowReset={ true }
						/>
					</WhenResponsiveScreen>
					<WhenResponsiveScreen screen="mobile">
						<AdvancedRangeControl
							label={ __( 'Column Gap' ) }
							min={ 0 }
							max={ 200 }
							value={ mobileColumnGap }
							onChange={ ( mobileColumnGap = 35 ) => setAttributes( { mobileColumnGap } ) }
							allowReset={ true }
						/>
					</WhenResponsiveScreen>
				</Fragment>
			) }
		</Fragment>
	)
} )

addFilter( 'stackable.number-box.edit.inspector.style.before', 'stackable/number-box', ( output, props ) => {
	const { setAttributes } = props
	const {
		columns,
		numberColor,
		titleColor,
		descriptionColor,
		numberBGColor,
		design = 'basic',
		borderRadius = 12,
		shadow = 3,
		backgroundColor,
		showNumber = true,
		showTitle = true,
		showDescription = true,
		numberBottomMargin = '',
		numberTabletBottomMargin = '',
		numberMobileBottomMargin = '',
		titleSize = '',
		titleTabletSize = '',
		titleMobileSize = '',
		titleBottomMargin = '',
		titleTabletBottomMargin = '',
		titleMobileBottomMargin = '',
		descriptionSize = '',
		descriptionTabletSize = '',
		descriptionMobileSize = '',
	} = props.attributes

	const show = applyFilters( 'stackable.number-box.edit.show', {
		backgroundColor: design !== 'plain',
		borderRadius: design !== 'plain',
		shadow: design !== 'plain',
		numberColor: true,
		numberBGColor: true,
		numberStyle: true,
	}, design, props )

	return (
		<Fragment>
			{ output }
			<PanelBody title={ __( 'General' ) }>
				<RangeControl
					label={ __( 'Columns' ) }
					value={ columns }
					onChange={ columns => setAttributes( { columns } ) }
					min={ 1 }
					max={ 3 }
				/>
				{ show.borderRadius &&
					<RangeControl
						label={ __( 'Border Radius' ) }
						value={ borderRadius }
						onChange={ ( borderRadius = 12 ) => setAttributes( { borderRadius } ) }
						min={ 0 }
						max={ 50 }
						allowReset={ true }
					/>
				}
				{ show.shadow &&
					<RangeControl
						label={ __( 'Shadow / Outline' ) }
						value={ shadow }
						onChange={ ( shadow = 3 ) => setAttributes( { shadow } ) }
						min={ 0 }
						max={ 9 }
						allowReset={ true }
					/>
				}
				<WhenResponsiveScreen>
					<AlignButtonsControl
						label={ __( 'Align' ) }
					></AlignButtonsControl>
				</WhenResponsiveScreen>
				<WhenResponsiveScreen screen="tablet">
					<AlignButtonsControl
						label={ __( 'Align' ) }
					></AlignButtonsControl>
				</WhenResponsiveScreen>
				<WhenResponsiveScreen screen="mobile">
					<AlignButtonsControl
						label={ __( 'Align' ) }
					></AlignButtonsControl>
				</WhenResponsiveScreen>
			</PanelBody>

			<PanelBackgroundSettings
				initialOpen={ false }
				// backgroundColorType={ backgroundColorType }
				backgroundColor={ backgroundColor }
				// backgroundColor2={ backgroundColor2 }
				// backgroundColorDirection={ backgroundColorDirection }
				// backgroundType={ backgroundType }
				// backgroundImageID={ backgroundImageID }
				// backgroundImageURL={ backgroundImageURL }
				// backgroundOpacity={ backgroundOpacity }
				// fixedBackground={ fixedBackground }
				onChangeBackgroundColorType={ () => {} }
				onChangeBackgroundColor={ show.backgroundColor && ( backgroundColor => setAttributes( { backgroundColor } ) ) }
				onChangeBackgroundColor2={ () => {} }
				onChangeBackgroundColorDirection={ () => {} }
				onChangeBackgroundType={ () => {} }
				onChangeBackgroundImage={ () => {} }
				onRemoveBackgroundImage={ () => {} }
				onChangeBackgroundOpacity={ () => {} }
				// onChangeFixedBackground={ () => {} }
			/>

			<PanelAdvancedSettings
				title={ __( 'Number' ) }
				checked={ showNumber }
				onChange={ showNumber => setAttributes( { showNumber } ) }
			>
				<SelectControl
					label={ __( 'Counter Font' ) }
					options={ [
						{ label: __( 'Theme default' ), value: 'theme' },
						{ label: __( 'Sans-Serif' ), value: 'sans-serif' },
						{ label: __( 'Serif' ), value: 'serif' },
						{ label: __( 'Monospace' ), value: 'monospace' },
					] }
					// value={ countFont }
					// onChange={ countFont => setAttributes( { countFont } ) }
				/>
				{ show.numberStyle && (
					<SelectControl
						label={ __( 'Number Style' ) }
						options={ [
							{ label: __( 'None' ), value: '' },
							{ label: __( 'Circle' ), value: 'circle' },
							{ label: __( 'Square' ), value: 'square' },
						] }
					/>
				) }
				{ show.numberBGColor && (
					<ColorPaletteControl
						value={ numberBGColor }
						onChange={ numberBGColor => setAttributes( { numberBGColor } ) }
						label={ __( 'Number Background Color' ) }
					/>
				) }
				{ show.numberColor && (
					<ColorPaletteControl
						value={ numberColor }
						onChange={ numberColor => setAttributes( { numberColor } ) }
						label={ __( 'Number Color' ) }
					/>
				) }
				<WhenResponsiveScreen>
					<AdvancedRangeControl
						label={ __( 'Number Size' ) }
						value={ 0 }
						// onChange={ shadow => setAttributes( { shadow } ) }
						min={ 0 }
						max={ 100 }
						units={ [ 'px', 'em' ] }
					/>
					<AdvancedRangeControl
						label={ __( 'Number Padding' ) }
						value={ 0 }
						// onChange={ shadow => setAttributes( { shadow } ) }
						min={ 0 }
						max={ 100 }
					/>
				</WhenResponsiveScreen>
				<WhenResponsiveScreen screen="tablet">
					<AdvancedRangeControl
						label={ __( 'Number Size' ) }
						value={ 0 }
						// onChange={ shadow => setAttributes( { shadow } ) }
						min={ 0 }
						max={ 100 }
						units={ [ 'px', 'em' ] }
					/>
					<AdvancedRangeControl
						label={ __( 'Number Padding' ) }
						value={ 0 }
						// onChange={ shadow => setAttributes( { shadow } ) }
						min={ 0 }
						max={ 100 }
					/>
				</WhenResponsiveScreen>
				<WhenResponsiveScreen screen="mobile">
					<AdvancedRangeControl
						label={ __( 'Number Size' ) }
						value={ 0 }
						// onChange={ shadow => setAttributes( { shadow } ) }
						min={ 0 }
						max={ 100 }
						units={ [ 'px', 'em' ] }
					/>
					<AdvancedRangeControl
						label={ __( 'Number Padding' ) }
						value={ 0 }
						// onChange={ shadow => setAttributes( { shadow } ) }
						min={ 0 }
						max={ 100 }
					/>
				</WhenResponsiveScreen>
			</PanelAdvancedSettings>

			<PanelAdvancedSettings
				title={ __( 'Title' ) }
				checked={ showTitle }
				onChange={ showTitle => setAttributes( { showTitle } ) }
			>
				<HeadingButtonsControl
					label={ __( 'Title HTML Tag' ) }
				></HeadingButtonsControl>
				<ColorPaletteControl
					value={ titleColor }
					onChange={ titleColor => setAttributes( { titleColor } ) }
					label={ __( 'Title Color' ) }
				/>
				<WhenResponsiveScreen>
					<AdvancedRangeControl
						label={ __( 'Title Size' ) }
						value={ titleSize }
						onChange={ titleSize => setAttributes( { titleSize } ) }
						min={ 0 }
						max={ 100 }
						units={ [ 'px', 'em' ] }
					/>
				</WhenResponsiveScreen>
				<WhenResponsiveScreen screen="tablet">
					<AdvancedRangeControl
						label={ __( 'Title Size' ) }
						value={ titleTabletSize }
						onChange={ titleTabletSize => setAttributes( { titleTabletSize } ) }
						min={ 0 }
						max={ 100 }
						units={ [ 'px', 'em' ] }
					/>
				</WhenResponsiveScreen>
				<WhenResponsiveScreen screen="mobile">
					<AdvancedRangeControl
						label={ __( 'Title Size' ) }
						value={ titleMobileSize }
						onChange={ titleMobileSize => setAttributes( { titleMobileSize } ) }
						min={ 0 }
						max={ 100 }
						units={ [ 'px', 'em' ] }
					/>
				</WhenResponsiveScreen>
			</PanelAdvancedSettings>

			<PanelAdvancedSettings
				title={ __( 'Description' ) }
				checked={ showDescription }
				onChange={ showDescription => setAttributes( { showDescription } ) }
			>
				<ColorPaletteControl
					value={ descriptionColor }
					onChange={ descriptionColor => setAttributes( { descriptionColor } ) }
					label={ __( 'Description Color' ) }
				/>
				<WhenResponsiveScreen>
					<AdvancedRangeControl
						label={ __( 'Description Size' ) }
						value={ descriptionSize }
						onChange={ descriptionSize => setAttributes( { descriptionSize } ) }
						min={ 0 }
						max={ 100 }
						units={ [ 'px', 'em' ] }
					/>
				</WhenResponsiveScreen>
				<WhenResponsiveScreen screen="tablet">
					<AdvancedRangeControl
						label={ __( 'Description Size' ) }
						value={ descriptionTabletSize }
						onChange={ descriptionTabletSize => setAttributes( { descriptionTabletSize } ) }
						min={ 0 }
						max={ 100 }
						units={ [ 'px', 'em' ] }
					/>
				</WhenResponsiveScreen>
				<WhenResponsiveScreen screen="mobile">
					<AdvancedRangeControl
						label={ __( 'Description Size' ) }
						value={ descriptionMobileSize }
						onChange={ descriptionMobileSize => setAttributes( { descriptionMobileSize } ) }
						min={ 0 }
						max={ 100 }
						units={ [ 'px', 'em' ] }
					/>
				</WhenResponsiveScreen>
			</PanelAdvancedSettings>

			<PanelBody title={ __( 'Spacing' ) } initialOpen={ false }>
				<WhenResponsiveScreen>
					{ showNumber && (
						<AdvancedRangeControl
							label={ __( 'Number' ) }
							// screens={ [ 'desktop', 'tablet', 'mobile' ] }
							value={ numberBottomMargin }
							onChange={ numberBottomMargin => setAttributes( { numberBottomMargin } ) }
							min={ 0 }
							max={ 100 }
						/>
					) }
					{ showTitle && (
						<AdvancedRangeControl
							label={ __( 'Title' ) }
							value={ titleBottomMargin }
							onChange={ titleBottomMargin => setAttributes( { titleBottomMargin } ) }
							min={ 0 }
							max={ 100 }
						/>
					) }
					{/* { showDescription && (
						<AdvancedRangeControl
							label={ __( 'Description' ) }
							value={ 0 }
							// onChange={ shadow => setAttributes( { shadow } ) }
							min={ 0 }
							max={ 100 }
						/>
					) } */}
				</WhenResponsiveScreen>
				<WhenResponsiveScreen screen="tablet">
					{ showNumber && (
						<AdvancedRangeControl
							label={ __( 'Number' ) }
							value={ numberTabletBottomMargin }
							onChange={ numberTabletBottomMargin => setAttributes( { numberTabletBottomMargin } ) }
							min={ 0 }
							max={ 100 }
						/>
					) }
					{ showTitle && (
						<AdvancedRangeControl
							label={ __( 'Title' ) }
							value={ titleTabletBottomMargin }
							onChange={ titleTabletBottomMargin => setAttributes( { titleTabletBottomMargin } ) }
							min={ 0 }
							max={ 100 }
						/>
					) }
					{/* { showDescription && (
						<AdvancedRangeControl
							label={ __( 'Description' ) }
							value={ 0 }
							// onChange={ shadow => setAttributes( { shadow } ) }
							min={ 0 }
							max={ 100 }
						/>
					) } */}
				</WhenResponsiveScreen>
				<WhenResponsiveScreen screen="mobile">
					{ showNumber && (
						<AdvancedRangeControl
							label={ __( 'Number' ) }
							value={ numberMobileBottomMargin }
							onChange={ numberMobileBottomMargin => setAttributes( { numberMobileBottomMargin } ) }
							min={ 0 }
							max={ 100 }
						/>
					) }
					{ showTitle && (
						<AdvancedRangeControl
							label={ __( 'Title' ) }
							value={ titleMobileBottomMargin }
							onChange={ titleMobileBottomMargin => setAttributes( { titleMobileBottomMargin } ) }
							min={ 0 }
							max={ 100 }
						/>
					) }
					{/* { showDescription && (
						<AdvancedRangeControl
							label={ __( 'Description' ) }
							value={ 0 }
							// onChange={ shadow => setAttributes( { shadow } ) }
							min={ 0 }
							max={ 100 }
						/>
					) } */}
				</WhenResponsiveScreen>
			</PanelBody>
		</Fragment>
	)
} )

addFilter( `stackable.number-box.edit.inspector.advanced.before`, `stackable/number-box/column-colors`, ( output, props ) => {
	const {
		columns = 2,
		design = 'basic',
	} = props.attributes

	const show = applyFilters( 'stackable.number-box.edit.show', {
		backgroundColor: design !== 'plain',
		borderRadius: design !== 'plain',
		shadow: design !== 'plain',
		numberColor: true,
		numberBGColor: true,
		numberStyle: true,
	}, design, props )

	return (
		<Fragment>
			{ output }
			<PanelBody
				initialOpen={ false }
				title={ __( 'Column #1' ) }
			>
				<p className="components-base-control__help">{ __( 'Override settings for this column.' ) }</p>
				{ show.numberBGColor && (
					<ColorPaletteControl
						label={ __( 'Number Background' ) }
					/>
				) }
				{ show.numberColor && (
					<ColorPaletteControl
						label={ __( 'Number Text' ) }
					/>
				) }
				<ColorPaletteControl
					label={ __( 'Title' ) }
				/>
				<ColorPaletteControl
					label={ __( 'Description' ) }
				/>
			</PanelBody>
			{ columns >= 2 && (
				<PanelBody
					initialOpen={ false }
					title={ __( 'Column #2' ) }
				>
					<p className="components-base-control__help">{ __( 'Override settings for this column.' ) }</p>
					{ show.numberBGColor && (
						<ColorPaletteControl
							label={ __( 'Number Background' ) }
						/>
					) }
					{ show.numberColor && (
						<ColorPaletteControl
							label={ __( 'Number Text' ) }
						/>
					) }
					<ColorPaletteControl
						label={ __( 'Title' ) }
					/>
					<ColorPaletteControl
						label={ __( 'Description' ) }
					/>
				</PanelBody>
			) }
			{ columns >= 3 && (
				<PanelBody
					initialOpen={ false }
					title={ __( 'Column #3' ) }
				>
					<p className="components-base-control__help">{ __( 'Override settings for this column.' ) }</p>
					{ show.numberBGColor && (
						<ColorPaletteControl
							label={ __( 'Number Background' ) }
						/>
					) }
					{ show.numberColor && (
						<ColorPaletteControl
							label={ __( 'Number Text' ) }
						/>
					) }
					<ColorPaletteControl
						label={ __( 'Title' ) }
					/>
					<ColorPaletteControl
						label={ __( 'Description' ) }
					/>
				</PanelBody>
			) }
			<PanelBody
				initialOpen={ false }
				title={ __( 'Responsive' ) }
			>
				<SelectControl
					label={ __( 'Collapse to 1 Column On' ) }
					value={ 'mobile' }
					options={ [
						{ label: __( 'Do Not Collapse' ), value: 'none' },
						{ label: __( 'Tablet' ), value: 'tablet' },
						{ label: __( 'Mobile' ), value: 'mobile' },
					] }
				/>
				<ToggleControl
					label={ __( 'Hide on Desktop' ) }
					checked={ false }
				/>
				<ToggleControl
					label={ __( 'Hide on Tablet' ) }
					checked={ false }
				/>
				<ToggleControl
					label={ __( 'Hide on Mobile' ) }
					checked={ false }
				/>
			</PanelBody>
		</Fragment>
	)
} )

const edit = props => {
	const {
		className,
		setAttributes,
		attributes,
	} = props

	const {
		columns,
		// numberColor,
		// titleColor,
		// descriptionColor,
		// numberBGColor,
		design = 'basic',
		// borderRadius = 12,
		shadow = 3,
		showNumber = true,
		showTitle = true,
		showDescription = true,
		// backgroundColor,
	} = props.attributes

	const mainClasses = classnames( [
		className,
		'ugb-number-box',
		'ugb-number-box--v3',
		`ugb-number-box--columns-${ columns }`,
	], applyFilters( 'stackable.number-box.mainclasses', {
		[ `ugb-number-box--design-${ design }` ]: design !== 'basic',
	}, design, props ) )

	return (
		<BlockContainer.Edit className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				{ range( 1, columns + 1 ).map( i => {
					const num = attributes[ `num${ i }` ]
					const title = attributes[ `title${ i }` ]
					const description = attributes[ `description${ i }` ]

					const boxClasses = classnames( [
						'ugb-number-box__item',
						`ugb-number-box__item${ i }`,
					], applyFilters( 'stackable.number-box.boxclasses', {
						[ `ugb--shadow-${ shadow }` ]: design !== 'plain' && shadow !== 3,
					}, design, props ) )

					return (
						<div className={ boxClasses } key={ i }>
							{ showNumber && (
								<RichText
									tagName="div"
									className="ugb-number-box__number"
									value={ num }
									onChange={ value => setAttributes( { [ `num${ i }` ]: value } ) }
									placeholder={ `0${ i }` }
									keepPlaceholderOnFocus
								/>
							) }
							{ ( showTitle || showDescription ) && (
								<div className="ugb-number-box__content">
									{ showTitle && (
										<RichText
											tagName="h4"
											value={ title }
											className="ugb-number-box__title"
											onChange={ value => setAttributes( { [ `title${ i }` ]: value } ) }
											placeholder={ __( 'Title' ) }
											keepPlaceholderOnFocus
										/>
									) }
									{ showDescription && (
										<RichText
											tagName="p"
											value={ description }
											className="ugb-number-box__description"
											onChange={ value => setAttributes( { [ `description${ i }` ]: value } ) }
											placeholder={ descriptionPlaceholder() }
											keepPlaceholderOnFocus
										/>
									) }
								</div>
							) }
						</div>
					)
				} ) }
			</Fragment>
		) } />
	)
}

export default compose(
	withUniqueClass,
	withTabbedInspector,
	withBlockStyles( createStyles ),
)( edit )
