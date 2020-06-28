/**
 * File customizer.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

( function( $ ) {

	/**
     * Outputs custom css for responsive controls
     * @param  {[string]} setting customizer setting
     * @param  {[string]} css_selector
     * @param  {[array]} css_prop css property to write
     * @param  {String} ext css value extension eg: px, in
     * @return {[string]} css output
     */
    function range_live_media_load( setting, css_selector, css_prop, ext = '' ) {
        wp.customize(
            setting, function( value ) {
                'use strict';
                value.bind(
                    function( to ){
                        var values          = JSON.parse( to );
                        var desktop_value   = JSON.parse( values.desktop );
                        var tablet_value    = JSON.parse( values.tablet );
                        var mobile_value    = JSON.parse( values.mobile );

                        var class_name      = 'customizer-' + setting;
                        var css_class       = $( '.' + class_name );
                        var selector_name   = css_selector;
                        var property_name   = css_prop;

                        var desktop_css     = '';
                        var tablet_css      = '';
                        var mobile_css      = '';

                        if ( property_name.length == 1 ) {
                            var desktop_css     = property_name[0] + ': ' + desktop_value + ext + ';';
                            var tablet_css      = property_name[0] + ': ' + tablet_value + ext + ';';
                            var mobile_css      = property_name[0] + ': ' + mobile_value + ext + ';';
                        } else if ( property_name.length == 2 ) {
                            var desktop_css     = property_name[0] + ': ' + desktop_value + ext + ';';
                            var desktop_css     = desktop_css + property_name[1] + ': ' + desktop_value + ext + ';';

                            var tablet_css      = property_name[0] + ': ' + tablet_value + ext + ';';
                            var tablet_css      = tablet_css + property_name[1] + ': ' + tablet_value + ext + ';';

                            var mobile_css      = property_name[0] + ': ' + mobile_value + ext + ';';
                            var mobile_css      = mobile_css + property_name[1] + ': ' + mobile_value + ext + ';';
                        }

                        var head_append     = '<style class="' + class_name + '">@media (min-width: 320px){ ' + selector_name + ' { ' + mobile_css + ' } } @media (min-width: 720px){ ' + selector_name + ' { ' + tablet_css + ' } } @media (min-width: 960px){ ' + selector_name + ' { ' + desktop_css + ' } }</style>';

                        if ( css_class.length ) {
                            css_class.replaceWith( head_append );
                        } else {
                            $( "head" ).append( head_append );
                        }
                    }
                );
            }
        );
    }
	// Site title and description.
	wp.customize( 'blogname', function( value ) {
		value.bind( function( to ) {
			$( '.site-title' ).text( to );
		} );
	} );
	wp.customize( 'blogdescription', function( value ) {
		value.bind( function( to ) {
			$( '.site-description' ).text( to );
		} );
	} );

	// Header text color.
	wp.customize( 'header_textcolor', function( value ) {
		value.bind( function( to ) {
			if ( 'blank' === to ) {
				$( '.site-title, .site-description' ).css( {
					'clip': 'rect(1px, 1px, 1px, 1px)',
					'position': 'absolute'
				} );
			} else {
				$( '.site-title, .site-description' ).css( {
					'clip': 'auto',
					'position': 'relative'
				} );
				$( '.site-title, .site-description' ).css( {
					'color': to
				} );
			}
		} );
	} );
	
	$(document).ready(function ($) {
        $('input[data-input-type]').on('input change', function () {
            var val = $(this).val();
            $(this).prev('.cs-range-value').html(val);
            $(this).val(val);
        });
    })
	
	
	// hdr_btn_lbl
	wp.customize(
		'hdr_btn_lbl', function( value ) {
			value.bind(
				function( newval ) {
					$( '.header_btn a' ).text( newval );
				}
			);
		}
	);
	
	/**
	 * hdr_btn_brdr_clr
	 */
	wp.customize( 'hdr_btn_brdr_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.header_btn a' ).css( 'border-color', color );
		} );
	} );
	
	/**
	 * hdr_btn_width
	 */
	wp.customize( 'hdr_btn_width', function( value ) {
		value.bind( function( width ) {
			jQuery( '.header_btn a' ).css( 'border-width', width + 'px' );
		} );
	} );
	
	/**
	 * hdr_btn_color
	 */
	wp.customize( 'hdr_btn_color', function( value ) {
		value.bind( function( color ) {
			jQuery( '.header_btn a' ).css( 'color', color );
		} );
	} );
	
	/**
	 * hdr_btn_bg_color
	 */
	wp.customize( 'hdr_btn_bg_color', function( value ) {
		value.bind( function( bg_color ) {
			jQuery( '.header_btn a' ).css( 'background-color', bg_color );
		} );
	} );
	
	/**
	 * hdr_btn_radius
	 */
	wp.customize( 'hdr_btn_radius', function( value ) {
		value.bind( function( border_size ) {
			jQuery( '.header_btn a' ).css( 'border-radius', border_size + 'px' );
		} );
	} );
	
	/**
	 * hdr_search_color
	 */
	wp.customize( 'hdr_search_color', function( value ) {
		value.bind( function( color ) {
			jQuery( '.search-button i' ).css( 'color', color );
		} );
	} );
	
	/**
	 * hdr_search_bg_color
	 */
	wp.customize( 'hdr_search_bg_color', function( value ) {
		value.bind( function( bg_color ) {
			jQuery( '.search-button #view-search-btn' ).css( 'background-color', bg_color );
			jQuery( '.search-button #view-search-btn' ).css( 'border-color', bg_color );
		} );
	} );
	
	/**
	 * hdr_search_bdr_radius
	 */
	wp.customize( 'hdr_search_bdr_radius', function( value ) {
		value.bind( function( radius ) {
			jQuery( '.search-button #view-search-btn' ).css( 'border-radius', radius+ 'px' );
		} );
	} );
	
	
	/**
	 * logo_width
	 */
	range_live_media_load( 'logo_width', '.logo img, .mobile-logo img', [ 'max-width' ], 'px !important' );
	/**
	 * Sticky Logo Width
	 */
	wp.customize( 'sticky_logo_width', function( value ) {
		value.bind( function( logo_width ) {
			jQuery( '.sticky-navbar-brand img' ).css( 'max-width', logo_width + 'px' );
		} );
	} );
	
	/**
	 * site_ttl_size
	 */
	 
	range_live_media_load( 'site_ttl_size', 'a.site-title', [ 'font-size' ], 'px !important' );
	
	/**
	 * site_desc_size
	 */
	 
	range_live_media_load( 'site_desc_size', '.site-description', [ 'font-size' ], 'px !important' );
	
	/**
	 * Menu Active
	 */
	wp.customize( 'xolo_menu_active', function( value ) {
		value.bind( function( column ) {
			jQuery( 'body' ).removeClass( function (index, className) {
				return (className.match (/(^|\s)active-\S+/g) || []).join(' ');
			});
			jQuery( 'body' ).addClass( column );
		} );
	} );
	
	/**
	 * mbl_menu_color
	 */
	wp.customize( 'mbl_menu_color', function( value ) {
		value.bind( function( color ) {
			jQuery( '.mobile-menu li > a' ).css( 'color', color );
		} );
	} );
	
	/**
	 * mbl_menu_hover_color
	 */
	wp.customize( 'mbl_menu_hover_color', function( value ) {
		value.bind( function( color ) {
			jQuery( '.theme-mobile-menu div.mobile-menu li > span a' ).css( 'color', color );
		} );
	} );
	
	/**
	 * Container Width
	 */
	wp.customize( 'xolo_hdr_cntnr_width', function( value ) {
		value.bind( function( xolo_hdr_cntnr_width ) {
			if (xolo_hdr_cntnr_width >= 768 && xolo_hdr_cntnr_width < 2000){
				jQuery( '#header-section .xl-container' ).css( 'max-width', xolo_hdr_cntnr_width + 'px' );
			}	
		} );
	} );
	
	/**
	 * xolo_cntnr_mtop
	 */
	wp.customize( 'xolo_cntnr_mtop', function( value ) {
		value.bind( function( margin ) {
			jQuery( '.main-content-part' ).css( 'margin-top', margin+ 'px' );
		} );
	} );
	
	/**
	 * xolo_cntnr_mbtm
	 */
	wp.customize( 'xolo_cntnr_mbtm', function( value ) {
		value.bind( function( margin ) {
			jQuery( '.xolo-content' ).css( 'margin-bottom', margin+ 'px' );
		} );
	} );
	
	/**
	 * xolo_site_layout
	 */
	$body = $( 'body' );	
	wp.customize( 'xolo_site_layout', function( value ) {
		value.bind( function( xolo_site_layout ) {
			$body.removeClass( function (index, className) {
				return (className.match (/(^|\s)xl-layout-\S+/g) || []).join(' ');
			});

			$body.addClass( 'xl-layout-' + xolo_site_layout );
		} );
	} );
	
	/**
	 * Container Width
	 */
	wp.customize( 'xolo_site_cntnr_width', function( value ) {
		
		value.bind( function( xolo_site_cntnr_width ) {
			var class_name      = 'xolo_site_cntnr_width'; // Used as id in gfont link
			var css_class       = $( '.' + class_name );			
			
			if (xolo_site_cntnr_width >= 768 && xolo_site_cntnr_width < 2000){
				var head_append     = '<style class="' + class_name + '">.xl-layout-contained .xl-container, .xl-layout-boxed .xl-container { max-width: ' + xolo_site_cntnr_width + 'px;} .xl-layout-boxed #page { max-width: ' + xolo_site_cntnr_width + 'px;}</style>';
			}

			if ( css_class.length ) {
				css_class.replaceWith( head_append );
			} else {
				$( 'head' ).append( head_append );
			}
			
		});
		
	} );
	/**
	 * Nav Bar Padding
	 */
	 range_live_media_load( 'xolo_menu_bar_padding', '#header-section .navigation, #header-section .theme-mobile-nav', [ 'padding-top', 'padding-bottom' ], 'px' );
	
	/**
	 * Footer Container Width
	 */
	wp.customize( 'footer_container_width', function( value ) {
		value.bind( function( footer_container_width ) {
			if (footer_container_width >= 768 && footer_container_width < 2000){
				jQuery( '.footer  .xl-container' ).css( 'max-width', footer_container_width + 'px' );
			}	
		} );
	} );
	
	/**
	 * footer_widget_top_border_width
	 */
	wp.customize( 'footer_widget_top_border_width', function( value ) {
		value.bind( function( border_width ) {
			jQuery( '.footer-wrapper' ).css( 'border-top-width', border_width + 'px' );
		} );
	} );
	
	/**
	 * footer_widget_bottom_border_width
	 */
	wp.customize( 'footer_widget_bottom_border_width', function( value ) {
		value.bind( function( border_width ) {
			jQuery( '.footer-wrapper' ).css( 'border-bottom-width', border_width + 'px' );
		} );
	} );
	
	/**
	 * footer_widget_top_brdr_clr
	 */
	wp.customize( 'footer_widget_top_brdr_clr', function( value ) {
		value.bind( function( border_color ) {
			jQuery( '.footer-wrapper' ).css( 'border-top-color', border_color );
		} );
	} );
	
	/**
	 * footer_widget_btm_border_clr
	 */
	wp.customize( 'footer_widget_btm_border_clr', function( value ) {
		value.bind( function( border_color ) {
			jQuery( '.footer-wrapper' ).css( 'border-bottom-color', border_color );
		} );
	} );
	
	/**
	 * footer_wid_clr
	 */
	wp.customize( 'footer_wid_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.footer-wrapper, .footer-wrapper p' ).css( 'color', color );
		} );
	} );
	
	/**
	 * footer_copy_txt_clr
	 */
	wp.customize( 'footer_copy_txt_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.footer-copyright, .footer-copyright p, .footer-copy ul.menu-wrap a, .footer-copyright p.no-widget-text a' ).css( 'color', color );
		} );
	} );
	
	/**
	 * footer_widget_ttl_clr
	 */
	wp.customize( 'footer_widget_ttl_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.footer .widget_title' ).css( 'color', color );
		} );
	} );
	
	/**
	 * foot_wid_link_clr
	 */
	wp.customize( 'foot_wid_link_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.footer-wrapper .widget li a, .footer-wrapper .widget  a' ).css( 'color', color );
		} );
	} );
	
	/**
	 * foot_copy_wid_link_clr
	 */
	wp.customize( 'foot_copy_wid_link_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.footer-copyright .widget li a, .footer-copyright .widget  a, .footer-copyright a' ).css( 'color', color );
		} );
	} );
	
	/**
	 * footer_wid_bg_color
	 */
	wp.customize( 'footer_wid_bg_color', function( value ) {
		value.bind( function( color ) {
			jQuery( '.footer-wrapper' ).css( 'background-color', color );
		} );
	} );
	
	/**
	 * footer_copy_bg_color
	 */
	wp.customize( 'footer_copy_bg_color', function( value ) {
		value.bind( function( color ) {
			jQuery( '.footer-copyright' ).css( 'background-color', color );
		} );
	} );
	/**
	 * footer_wid_top_border_style
	 */
	wp.customize( 'footer_wid_top_border_style', function( value ) {
		value.bind( function( border_style ) {
			jQuery( '.footer-wrapper' ).css( 'border-top-style', border_style );
		} );
	} );
	
	/**
	 * footer_wid_btm_border_style
	 */
	wp.customize( 'footer_wid_btm_border_style', function( value ) {
		value.bind( function( border_style ) {
			jQuery( '.footer-wrapper' ).css( 'border-bottom-style', border_style );
		} );
	} );
	
	range_live_media_load( 'breadcrumb_min_height', 'div.breadcrumb-content', [ 'min-height' ], 'px' );

	/**
	 * sidebar_widget_ttl_clr
	 */
	wp.customize( 'sidebar_widget_ttl_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.sidebar .widget_title' ).css( 'color', color );
		} );
	} );
	
	/**
	 * sidebar_wid_link_clr
	 */
	wp.customize( 'sidebar_wid_link_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.sidebar .widget:not(.widget_tag_cloud) a' ).css( 'color', color );
			jQuery( '.sidebar div.tagcloud a' ).css( 'border-left-color', color );
		} );
	} );
	
	/**
	 * sidebar_wid_ttl_size
	 */
	range_live_media_load( 'sidebar_wid_ttl_size', '.sidebar .widget .widget_title', [ 'font-size' ], 'px' );
	
	/**
	 * foot_wid_ttl_size
	 */
	range_live_media_load( 'foot_wid_ttl_size', '#footer .widget .widget_title', [ 'font-size' ], 'px' );
	
	/**
	 * Body font family
	 */
	wp.customize( 'xolo_body_font_family', function( value ) {
		value.bind( function( font_family ) {
			jQuery( 'body' ).css( 'font-family', font_family );
		} );
	} );
	
	/**
	 * Body font size
	 */
	
	range_live_media_load( 'xolo_body_font_size', 'body', [ 'font-size' ], 'px' );
	
	/**
	 * Body Letter Spacing
	 */
	
	range_live_media_load( 'xolo_body_ltr_space', 'body', [ 'letter-spacing' ], 'px' );
	
	/**
	 * Body font weight
	 */
	wp.customize( 'xolo_body_font_weight', function( value ) {
		value.bind( function( font_weight ) {
			jQuery( 'body' ).css( 'font-weight', font_weight );
		} );
	} );
	
	/**
	 * Body font style
	 */
	wp.customize( 'xolo_body_font_style', function( value ) {
		value.bind( function( font_style ) {
			jQuery( 'body' ).css( 'font-style', font_style );
		} );
	} );
	
	/**
	 * Body Text Decoration
	 */
	wp.customize( 'xolo_body_txt_decoration', function( value ) {
		value.bind( function( decoration ) {
			jQuery( 'body, a' ).css( 'text-decoration', decoration );
		} );
	} );
	/**
	 * Body text tranform
	 */
	wp.customize( 'xolo_body_text_transform', function( value ) {
		value.bind( function( text_tranform ) {
			jQuery( 'body' ).css( 'text-transform', text_tranform );
		} );
	} );
	
	/**
	 * xolo_body_line_height
	 */
	range_live_media_load( 'xolo_body_line_height', 'body', [ 'line-height' ] );
	
	/**
	 * H1 font family
	 */
	wp.customize( 'xolo_h1_font_family', function( value ) {
		value.bind( function( font_family ) {
			jQuery( 'h1' ).css( 'font-family', font_family );
		} );
	} );
	
	/**
	 * H1 font size
	 */
	range_live_media_load( 'xolo_h1_font_size', 'h1', [ 'font-size' ], 'px' );
	
	/**
	 * H1 font style
	 */
	wp.customize( 'xolo_h1_font_style', function( value ) {
		value.bind( function( font_style ) {
			jQuery( 'h1' ).css( 'font-style', font_style );
		} );
	} );
	
	/**
	 * H1 Text Decoration
	 */
	wp.customize( 'xolo_h1_text_decoration', function( value ) {
		value.bind( function( decoration ) {
			jQuery( 'h1' ).css( 'text-decoration', decoration );
		} );
	} );
	
	/**
	 * H1 font weight
	 */
	wp.customize( 'xolo_h1_font_weight', function( value ) {
		value.bind( function( font_weight ) {
			jQuery( 'h1' ).css( 'font-weight', font_weight );
		} );
	} );
	
	/**
	 * H1 text tranform
	 */
	wp.customize( 'xolo_h1_text_transform', function( value ) {
		value.bind( function( text_tranform ) {
			jQuery( 'h1' ).css( 'text-transform', text_tranform );
		} );
	} );
	
	/**
	 * H1 line height
	 */
	range_live_media_load( 'xolo_h1_line_height', 'h1', [ 'line-height' ] );
	
	/**
	 * H1 Letter Spacing
	 */
	 
	range_live_media_load( 'xolo_h1_ltr_spacing', 'h1', [ 'letter-spacing' ], 'px' );
	
	/**
	 * H2 font family
	 */
	wp.customize( 'xolo_h2_font_family', function( value ) {
		value.bind( function( font_family ) {
			jQuery( 'h2' ).css( 'font-family', font_family );
		} );
	} );
	
	/**
	 * H2 font size
	 */
	range_live_media_load( 'xolo_h2_font_size', 'h2', [ 'font-size' ], 'px' );
	
	/**
	 * H2 font style
	 */
	wp.customize( 'xolo_h2_font_style', function( value ) {
		value.bind( function( font_style ) {
			jQuery( 'h2' ).css( 'font-style', font_style );
		} );
	} );
	
	/**
	 * H2 Text Decoration
	 */
	wp.customize( 'xolo_h2_text_decoration', function( value ) {
		value.bind( function( decoration ) {
			jQuery( 'h2' ).css( 'text-decoration', decoration );
		} );
	} );
	
	/**
	 * H2 font weight
	 */
	wp.customize( 'xolo_h2_font_weight', function( value ) {
		value.bind( function( font_weight ) {
			jQuery( 'h2' ).css( 'font-weight', font_weight );
		} );
	} );
	
	/**
	 * H2 text tranform
	 */
	wp.customize( 'xolo_h2_text_transform', function( value ) {
		value.bind( function( text_tranform ) {
			jQuery( 'h2' ).css( 'text-transform', text_tranform );
		} );
	} );
	
	/**
	 * H2 line height
	 */
	range_live_media_load( 'xolo_h2_line_height', 'h2', [ 'line-height' ]);
	
	/**
	 * H2 Letter Spacing
	 */
	
	range_live_media_load( 'xolo_h2_ltr_spacing', 'h2', [ 'letter-spacing' ], 'px' );
	/**
	 * H3 font family
	 */
	wp.customize( 'xolo_h3_font_family', function( value ) {
		value.bind( function( font_family ) {
			jQuery( 'h3' ).css( 'font-family', font_family );
		} );
	} );
	
	/**
	 * H3 font size
	 */
	range_live_media_load( 'xolo_h3_font_size', 'h3', [ 'font-size' ], 'px' );
	
	/**
	 * H3 font style
	 */
	wp.customize( 'xolo_h3_font_style', function( value ) {
		value.bind( function( font_style ) {
			jQuery( 'h3' ).css( 'font-style', font_style );
		} );
	} );
	
	/**
	 * H3 Text Decoration
	 */
	wp.customize( 'xolo_h3_text_decoration', function( value ) {
		value.bind( function( decoration ) {
			jQuery( 'h3' ).css( 'text-decoration', decoration );
		} );
	} );
	
	/**
	 * H3 font weight
	 */
	wp.customize( 'xolo_h3_font_weight', function( value ) {
		value.bind( function( font_weight ) {
			jQuery( 'h3' ).css( 'font-weight', font_weight );
		} );
	} );
	
	/**
	 * H3 text tranform
	 */
	wp.customize( 'xolo_h3_text_transform', function( value ) {
		value.bind( function( text_tranform ) {
			jQuery( 'h3' ).css( 'text-transform', text_tranform );
		} );
	} );
	
	/**
	 * H3 line height
	 */
	range_live_media_load( 'xolo_h3_line_height', 'h3', [ 'line-height' ]);
	
	/**
	 * H3 Letter Spacing
	 */
	
	range_live_media_load( 'xolo_h3_ltr_spacing', 'h3', [ 'letter-spacing' ], 'px' );
	
	
	/**
	 * H4 font family
	 */
	wp.customize( 'xolo_h4_font_family', function( value ) {
		value.bind( function( font_family ) {
			jQuery( 'h4' ).css( 'font-family', font_family );
		} );
	} );
	
	/**
	 * H4 font size
	 */
	range_live_media_load( 'xolo_h4_font_size', 'h4', [ 'font-size' ], 'px' );
	
	/**
	 * H4 font style
	 */
	wp.customize( 'xolo_h4_font_style', function( value ) {
		value.bind( function( font_style ) {
			jQuery( 'h4' ).css( 'font-style', font_style );
		} );
	} );
	
	/**
	 * H4 Text Decoration
	 */
	wp.customize( 'xolo_h4_text_decoration', function( value ) {
		value.bind( function( decoration ) {
			jQuery( 'h4' ).css( 'text-decoration', decoration );
		} );
	} );
	
	/**
	 * H4 font weight
	 */
	wp.customize( 'xolo_h4_font_weight', function( value ) {
		value.bind( function( font_weight ) {
			jQuery( 'h4' ).css( 'font-weight', font_weight );
		} );
	} );
	
	/**
	 * H4 text tranform
	 */
	wp.customize( 'xolo_h4_text_transform', function( value ) {
		value.bind( function( text_tranform ) {
			jQuery( 'h4' ).css( 'text-transform', text_tranform );
		} );
	} );
	
	/**
	 * H4 line height
	 */
	range_live_media_load( 'xolo_h4_line_height', 'h4', [ 'line-height' ]);
	
	/**
	 * H4 Letter Spacing
	 */
	
		range_live_media_load( 'xolo_h4_ltr_spacing', 'h4', [ 'letter-spacing' ], 'px' );
	
	/**
	 * H5 font family
	 */
	wp.customize( 'xolo_h5_font_family', function( value ) {
		value.bind( function( font_family ) {
			jQuery( 'h5' ).css( 'font-family', font_family );
		} );
	} );
	
	/**
	 * H5 font size
	 */
	range_live_media_load( 'xolo_h5_font_size', 'h5', [ 'font-size' ], 'px' );
	
	/**
	 * H5 font style
	 */
	wp.customize( 'xolo_h5_font_style', function( value ) {
		value.bind( function( font_style ) {
			jQuery( 'h5' ).css( 'font-style', font_style );
		} );
	} );
	
	/**
	 * H5 Text Decoration
	 */
	wp.customize( 'xolo_h5_text_decoration', function( value ) {
		value.bind( function( decoration ) {
			jQuery( 'h5' ).css( 'text-decoration', decoration );
		} );
	} );
	
	
	/**
	 * H5 font weight
	 */
	wp.customize( 'xolo_h5_font_weight', function( value ) {
		value.bind( function( font_weight ) {
			jQuery( 'h5' ).css( 'font-weight', font_weight );
		} );
	} );
	
	/**
	 * H5 text tranform
	 */
	wp.customize( 'xolo_h5_text_transform', function( value ) {
		value.bind( function( text_tranform ) {
			jQuery( 'h5' ).css( 'text-transform', text_tranform );
		} );
	} );
	
	/**
	 * H5 line height
	 */
	range_live_media_load( 'xolo_h5_line_height', 'h5', [ 'line-height' ]);
	
	/**
	 * H5 Letter Spacing
	 */
	
	range_live_media_load( 'xolo_h5_ltr_spacing', 'h5', [ 'letter-spacing' ], 'px' );
	
	/**
	 * H6 font family
	 */
	wp.customize( 'xolo_h6_font_family', function( value ) {
		value.bind( function( font_family ) {
			jQuery( 'h6' ).css( 'font-family', font_family );
		} );
	} );
	
	/**
	 * H6 font size
	 */
	range_live_media_load( 'xolo_h6_font_size', 'h6', [ 'font-size' ], 'px' );
	
	/**
	 * H6 font style
	 */
	wp.customize( 'xolo_h6_font_style', function( value ) {
		value.bind( function( font_style ) {
			jQuery( 'h6' ).css( 'font-style', font_style );
		} );
	} );
	
	/**
	 * H6 Text Decoration
	 */
	wp.customize( 'xolo_h6_text_decoration', function( value ) {
		value.bind( function( decoration ) {
			jQuery( 'h6' ).css( 'text-decoration', decoration );
		} );
	} );
	
	
	/**
	 * H6 font weight
	 */
	wp.customize( 'xolo_h6_font_weight', function( value ) {
		value.bind( function( font_weight ) {
			jQuery( 'h6' ).css( 'font-weight', font_weight );
		} );
	} );
	
	/**
	 * H6 text tranform
	 */
	wp.customize( 'xolo_h6_text_transform', function( value ) {
		value.bind( function( text_tranform ) {
			jQuery( 'h6' ).css( 'text-transform', text_tranform );
		} );
	} );
	
	/**
	 * H6 line height
	 */
	range_live_media_load( 'xolo_h6_line_height', 'h6', [ 'line-height' ]);
	
	/**
	 * H6 Letter Spacing
	 */
	
	range_live_media_load( 'xolo_h6_ltr_spacing', 'h6', [ 'letter-spacing' ], 'px' );
	
	/**
	 * single_post_ttl_size
	 */
	range_live_media_load( 'single_post_ttl_size', '.blog-single-title', [ 'font-size' ], 'px' );
	
	/**
	 * achive_post_ttl_size
	 */
	range_live_media_load( 'achive_post_ttl_size', '.blog-multi-title', [ 'font-size' ], 'px' );
	
	/**
	 * breadcrumb_text_clr
	 */
	wp.customize( 'breadcrumb_text_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '#breadcrumb-area h2, .breadcrumb-list li' ).css( 'color', color );
		} );
	} );
	
	/**
	 * breadcrumb_link_clr
	 */
	wp.customize( 'breadcrumb_link_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.breadcrumb-list li a' ).css( 'color', color );
		} );
	} );
	
	/**
	 * breadcrumb_bg_color
	 */
	wp.customize( 'breadcrumb_bg_color', function( value ) {
		value.bind( function( bg_color ) {
			jQuery( '#breadcrumb-area' ).css( 'background', bg_color );
		} );
	} );
	
	/**
	 * Breadcrumb Typography
	 */
	range_live_media_load( 'breadcrumb_title_size', '#breadcrumb-area h2', [ 'font-size' ], 'px' );
	range_live_media_load( 'breadcrumb_content_size', '#breadcrumb-area li', [ 'font-size' ], 'px' );
	
	/**
	 * sidebar_bg_clr
	 */
	wp.customize( 'sidebar_bg_clr', function( value ) {
		value.bind( function( bg_color ) {
			jQuery( '.sidebar-3 .sidebar, .sidebar-2 .sidebar .widget, .sidebar' ).css( 'background-color', bg_color );
		} );
	} );
	
	
	/**
	 * archive_post_txt_clr
	 */
	wp.customize( 'archive_post_txt_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.blog-items, .blog-items p, .blog-items .blog-meta' ).css( 'color', color );
		} );
	} );
	
	/**
	 * archive_post_link_clr
	 */
	wp.customize( 'archive_post_link_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.blog-items .post-title a' ).css( 'color', color );
		} );
	} );
	
	/**
	 * archive_post_icon_clr
	 */
	wp.customize( 'archive_post_icon_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.blog-items .blog-meta i' ).css( 'color', color );
		} );
	} );
	
	/**
	 * archive_post_bg_clr
	 */
	wp.customize( 'archive_post_bg_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.blog-items' ).css( 'background-color', color );
		} );
	} );
	
	/**
	 * Sidebar width.
	 */
	wp.customize( 'xolo_sidebar_width', function( value ) {		
            'use strict';
            value.bind(
                function( to ){
                    var class_name      = 'customizer-sidebar-width'; // Used as id in gfont link
                    var css_class       = $( '.' + class_name );

                    var sidebar_width   = to;
                    var content_width   = ( 100 - to );

                    var head_append     = '<style class="' + class_name + '">@media (min-width: 992px){#secondary-content { max-width: ' + sidebar_width + '%;flex-basis: ' + sidebar_width + '%; } #primary-content { max-width: ' + content_width + '%;flex-basis: ' + content_width + '%; }}</style>';

                    if ( css_class.length ) {
                        css_class.replaceWith( head_append );
                    } else {
                        $( 'head' ).append( head_append );
                    }
                }
            );
        }
    );
		
	range_live_media_load( 'sidebar_wid_padding', 'div.sidebar [class*="widget_"]:not(.widget_social_widget):not(.widget_info):not(.widget_social_widget):not(.widget_menu_top):not(.widget_calender):not(.widget_tag) ul:not(.days) li a', [ 'padding-top', 'padding-bottom' ], 'px' );
	
	
	
	/**
	 * breadcrumb_top_brdr_width
	 */
	wp.customize( 'breadcrumb_top_brdr_width', function( value ) {
		value.bind( function( border_width ) {
			jQuery( '.breadcrumb-area' ).css( 'border-top-width', border_width + 'px' );
		} );
	} );
	
	/**
	 * breadcrumb_btm_brdr_width
	 */
	wp.customize( 'breadcrumb_btm_brdr_width', function( value ) {
		value.bind( function( border_width ) {
			jQuery( '.breadcrumb-area' ).css( 'border-bottom-width', border_width + 'px' );
		} );
	} );
	
	/**
	 * breadcrumb_top_brdr_clr
	 */
	wp.customize( 'breadcrumb_top_brdr_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.breadcrumb-area' ).css( 'border-top-color', color );
			//jQuery( '.breadcrumb-area' ).css( 'border-top-style', 'solid' );
		} );
	} );
	
	/**
	 * breadcrumb_btm_brdr_clr
	 */
	wp.customize( 'breadcrumb_btm_brdr_clr', function( value ) {
		value.bind( function( color ) {
			jQuery( '.breadcrumb-area' ).css( 'border-bottom-color', color );
		} );
	} );
} )( jQuery );