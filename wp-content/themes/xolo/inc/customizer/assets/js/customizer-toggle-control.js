/**
 * Customizer controls toggles
 *
 * @package Xolo
 */

( function( $ ) {

	/* Internal shorthand */
	var api = wp.customize;

	/**
	 * Trigger hooks
	 */
	XOLOControlTrigger = {

	    /**
	     * Trigger a hook.
	     *
	     * @since 1.0.0
	     * @method triggerHook
	     * @param {String} hook The hook to trigger.
	     * @param {Array} args An array of args to pass to the hook.
		 */
	    triggerHook: function( hook, args )
	    {
	    	$( 'body' ).trigger( 'xolo-control-trigger.' + hook, args );
	    },

	    /**
	     * Add a hook.
	     *
	     * @since 1.0.0
	     * @method addHook
	     * @param {String} hook The hook to add.
	     * @param {Function} callback A function to call when the hook is triggered.
	     */
	    addHook: function( hook, callback )
	    {
	    	$( 'body' ).on( 'xolo-control-trigger.' + hook, callback );
	    },

	    /**
	     * Remove a hook.
	     *
	     * @since 1.0.0
	     * @method removeHook
	     * @param {String} hook The hook to remove.
	     * @param {Function} callback The callback function to remove.
	     */
	    removeHook: function( hook, callback )
	    {
		    $( 'body' ).off( 'xolo-control-trigger.' + hook, callback );
	    },
	};

	/**
	 * Helper class that contains data for showing and hiding controls.
	 *
	 * @since 1.0.0
	 * @class XOLOCustomizerToggles
	 */
	XOLOCustomizerToggles = {
				
		/**
		 *  Header Button
		 */
		'hdr_btn_enable' :
		[
			{
				controls: [
					'hdr_btn_lbl',
					'hdr_btn_link',
					'hdr_btn_radius',
					'hdr_btn_color',
					'hdr_btn_bg_color',
					'hdr_btn_brdr_clr',
					'hdr_btn_width',
				],
				callback: function( header_btn ) {

					var header_btn = api( 'hdr_btn_enable' ).get();

					if ( '1' == header_btn ) {
						return true;
					}
					return false;
				}
			}
		],
		
		/**
		 *  Header Search
		 */
		'hdr_search_enable' :
		[
			{
				controls: [
					'hdr_search_color',
					'hdr_search_bg_color',
					'hdr_search_bdr_radius',
				],
				callback: function( header_search ) {

					var header_search = api( 'hdr_search_enable' ).get();

					if ( '1' == header_search ) {
						return true;
					}
					return false;
				}
			}
		],
		
		/**
		 *  Mobile Logo
		 */
		'mobile_logo_on' :
		[
			{
				controls: [
					'mobile_logo'
				],
				callback: function( mobile_logo ) {

					var mobile_logo = api( 'mobile_logo_on' ).get();

					if ( '1' == mobile_logo ) {
						return true;
					}
					return false;
				}
			}
		],
		
		/**
		 *  Sticky Logo
		 */
		'sticky_enable' :
		[
			{
				controls: [
					'sticky_logo',
					'sticky_logo_width'
				],
				callback: function( sticky_logo ) {

					var sticky_logo = api( 'sticky_enable' ).get();

					if ( '1' == sticky_logo ) {
						return true;
					}
					return false;
				}
			}
		],
		
		/**
		 * Footer Widget Bg 
		 */
		'footer_widget_bg' :
		[
			{
				controls: [
					'footer_wid_bg_color',
				],
				callback: function( footer_bg ) {

					var header_bg = api( 'footer_widget_bg' ).get();

					if ( 'bg_color' == footer_bg ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_widget_grad_color',
					'foo_wid_grad_loc_1',
					'footer_widget_grad_color2',
					'foo_wid_grad_loc_2',
					'footer_grad_type'
				],
				callback: function( footer_bg ) {

					var header_bg = api( 'footer_widget_bg' ).get();

					if ( 'gradient_color' == footer_bg ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_grad_position',
				],
				callback: function( gradient_type ) {

					var footer_section_1 = api( 'footer_grad_type' ).get();

					if ( 'radial' == gradient_type ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_widget_grad_degree',
				],
				callback: function( gradient_type ) {

					var footer_section_1 = api( 'footer_grad_type' ).get();

					if ( 'linear' == gradient_type ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_bg_img',
					'footer_back_repeat',
					'footer_back_position',
					'footer_back_size',
					'footer_back_attach',
					'footer_bg_img_opacity',
					'foot_wid_img_ovelay',
				],
				callback: function( footer_bg ) {

					var header_bg = api( 'footer_widget_bg' ).get();

					if ( 'bg_image' == footer_bg ) {
						return true;
					}
					return false;
				}
			}
		],
		
		'footer_grad_type' :
		[
			{
				controls: [
					'footer_grad_position',
				],
				callback: function( enabled_section_1 ) {

					var gradient_type = api( 'footer_widget_bg' ).get();

					if ( 'radial' == enabled_section_1 && 'gradient_color' == gradient_type ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_widget_grad_degree',
				],
				callback: function( enabled_section_1 ) {

					var gradient_type = api( 'footer_widget_bg' ).get();

					if ( 'linear' == enabled_section_1 && 'gradient_color' == gradient_type ) {
						return true;
					}
					return false;
				}
			}
		],
		
		/**
		 * Footer Bottom
		 */
		 'footer_copy_bg' :
		[
			{
				controls: [
					'footer_copy_bg_color',
				],
				callback: function( footer_bg ) {

					var header_bg = api( 'footer_copy_bg' ).get();

					if ( 'bg_color' == footer_bg ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_copy_grad_color',
					'foo_copy_grad_loc_1',
					'footer_copy_grad_color2',
					'foo_copy_grad_loc_2',
					'footer_copy_grad_type'
				],
				callback: function( footer_bg ) {

					var header_bg = api( 'footer_copy_bg' ).get();

					if ( 'gradient_color' == footer_bg ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_copy_position',
				],
				callback: function( gradient_type ) {

					var footer_section_1 = api( 'footer_copy_grad_type' ).get();

					if ( 'radial' == gradient_type ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_copy_grad_degree',
				],
				callback: function( gradient_type ) {

					var footer_section_1 = api( 'footer_copy_grad_type' ).get();

					if ( 'linear' == gradient_type ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_copy_bg_img',
					'footer_copy_back_repeat',
					'footer_copy_back_position',
					'footer_copy_back_size',
					'footer_copy_bg_back_attach',
					'footer_copy_bg_img_opacity',
					'foot_copy_bg_img_ovelay',
				],
				callback: function( footer_bg ) {

					var header_bg = api( 'footer_copy_bg' ).get();

					if ( 'bg_image' == footer_bg ) {
						return true;
					}
					return false;
				}
			}
		],
		
		'footer_copy_grad_type' :
		[
			{
				controls: [
					'footer_copy_position',
				],
				callback: function( enabled_section_1 ) {

					var gradient_type = api( 'footer_copy_bg' ).get();

					if ( 'radial' == enabled_section_1 && 'gradient_color' == gradient_type ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_copy_grad_degree',
				],
				callback: function( enabled_section_1 ) {

					var gradient_type = api( 'footer_copy_bg' ).get();

					if ( 'linear' == enabled_section_1 && 'gradient_color' == gradient_type ) {
						return true;
					}
					return false;
				}
			}
		],
		
		'footer_bottom_layout' :
		[
			{
				controls: [
					'footer_bottom_1',
					'footer_bottom_2'
				],
				callback: function( footer_bottom_layout ) {

					if ( 'disable' != footer_bottom_layout ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_first_custom',
				],
				callback: function( footer_bottom_layout ) {

					var footer_section_1 = api( 'footer_bottom_1' ).get();

					if ( 'disable' != footer_bottom_layout && 'custom' == footer_section_1 ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_first_shortcode',
				],
				callback: function( footer_bottom_layout ) {

					var footer_section_1 = api( 'footer_bottom_1' ).get();

					if ( 'disable' != footer_bottom_layout && 'shortcode' == footer_section_1 ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_second_custom',
				],
				callback: function( footer_bottom_layout ) {

					var footer_section_2 = api( 'footer_bottom_2' ).get();

					if ( 'disable' != footer_bottom_layout && 'custom' == footer_section_2 ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_second_shortcode',
				],
				callback: function( footer_bottom_layout ) {

					var footer_section_1 = api( 'footer_bottom_2' ).get();

					if ( 'disable' != footer_bottom_layout && 'shortcode' == footer_section_1 ) {
						return true;
					}
					return false;
				}
			},
		],
		'footer_bottom_1' :
		[
			{
				controls: [
					'footer_first_custom',
				],
				callback: function( enabled_section_1 ) {

					var footer_layout = api( 'footer_bottom_layout' ).get();

					if ( 'custom' == enabled_section_1 && 'disable' != footer_layout ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_first_shortcode',
				],
				callback: function( enabled_section_1 ) {

					var footer_layout = api( 'footer_bottom_layout' ).get();

					if ( 'shortcode' == enabled_section_1 && 'disable' != footer_layout ) {
						return true;
					}
					return false;
				}
			}
		],
		'footer_bottom_2' :
		[
			{
				controls: [
					'footer_second_custom',
				],
				callback: function( enabled_section_2 ) {

					var footer_layout = api( 'footer_bottom_layout' ).get();

					if ( 'custom' == enabled_section_2 && 'disable' != footer_layout ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'footer_second_shortcode',
				],
				callback: function( enabled_section_2 ) {

					var footer_layout = api( 'footer_bottom_layout' ).get();

					if ( 'shortcode' == enabled_section_2 && 'disable' != footer_layout ) {
						return true;
					}
					return false;
				}
			}
		],
		
		/**
		 *  Footer Container
		 */
		'footer_container_style' :
		[
			{
				controls: [
					'footer_container_width'
				],
				callback: function( footer_container ) {

					var footer_container = api( 'footer_container_style' ).get();

					if ( 'container' == footer_container ) {
						return true;
					}
					return false;
				}
			}
		],	


		/**
		 * Breadcrumb Bg 
		 */
		'breadcrumb_bg' :
		[
			{
				controls: [
					'breadcrumb_bg_color',
				],
				callback: function( breadcrumb_bg ) {

					var header_bg = api( 'breadcrumb_bg' ).get();

					if ( 'bg_color' == breadcrumb_bg ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'breadcrumb_grad_color',
					'breadcrumb_grad_loc_1',
					'breadcrumb_grad_color2',
					'breadcrumb_grad_loc_2',
					'breadcrumb_grad_degree',
				],
				callback: function( breadcrumb_bg ) {

					var header_bg = api( 'breadcrumb_bg' ).get();

					if ( 'gradient_color' == breadcrumb_bg ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'breadcrumb_bg_img',
					'breadcrumb_bg_img_opacity',
					'breadcrumb_overlay_color',
					'breadcrumb_back_repeat',
					'breadcrumb_back_position',
					'breadcrumb_back_size',
					'breadcrumb_back_attach',
					'breadcrumb_bg_img_opacity',
				],
				callback: function( breadcrumb_bg ) {

					var header_bg = api( 'breadcrumb_bg' ).get();

					if ( 'bg_image' == breadcrumb_bg ) {
						return true;
					}
					return false;
				}
			}
		],


		/**
		 *  xolo_post_excerpt
		 */
		'enable_post_excerpt' :
		[
			{
				controls: [
					'xolo_post_excerpt',
					'enable_post_btn'
				],
				callback: function( xolo_post_excerpt ) {

					var xolo_post_excerpt = api( 'enable_post_excerpt' ).get();

					if ( '1' == xolo_post_excerpt ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'read_btn_txt'
				],
				callback: function( xolo_post_excerpt ) {

					var enable_post_excerpt = api( 'enable_post_btn' ).get();

					if ( '1' == xolo_post_excerpt && '1' == enable_post_excerpt ) {
						return true;
					}
					return false;
				}
			}
		],	
			
		'enable_post_btn' :
		[
			{
				controls: [
					'read_btn_txt'
				],
				callback: function( xolo_post_excerpt ) {

					var enable_post_excerpt = api( 'enable_post_excerpt' ).get();

					if ( '1' == xolo_post_excerpt && '1' == enable_post_excerpt ) {
						return true;
					}
					return false;
				}
			}
		],	
		
		/**
		 *  Xolo Site Layout
		 */
		'xolo_site_layout' :
		[
			{
				controls: [
					'xolo_site_cntnr_width'
				],
				callback: function( xolo_site_layout ) {

					var xolo_site_layout = api( 'xolo_site_layout' ).get();

					if ( 'stretched' !== xolo_site_layout ) {
						return true;
					}
					return false;
				}
			}
		],
		
		/**
		 *  edd_product_types
		 */
		'edd_product_types' :
		[
			{
				controls: [
					'edd_archive_column'
				],
				callback: function( edd_product_types ) {

					var edd_product_types = api( 'edd_product_types' ).get();

					if ( 'grid' == edd_product_types ) {
						return true;
					}
					return false;
				}
			}
		],
	};

} )( jQuery );
