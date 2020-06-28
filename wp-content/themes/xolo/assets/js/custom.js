var XoloThemeJs;

(function( $, xoloConfig ) {
  'use strict';

  XoloThemeJs = {

    eventID: 'XoloThemeJs',

    $document: $( document ),
    $window:   $( window ),
    $body:     $( 'body' ),

    classes: {
      toggled:              'toggled',
      isOverlay:            'overlay-enabled',
      headerMenuActive:     'header-menu-active',
      headerSearchActive:   'header-search-active'
    },

    init: function() {
      // Document ready event check
      this.$document.on( 'ready', this.documentReadyRender.bind( this ) );
      this.$window.on( 'ready', this.documentReadyRender.bind( this ) );
    },

    documentReadyRender: function() {

      // Document Events
      this.$document
        .on( 'click.' + this.eventID, '.menu-toggle',   this.menuToggleHandler.bind( this ) )
        .on( 'click.' + this.eventID, '.close-menu',    this.menuToggleHandler.bind( this ) )

        .on( 'click.' + this.eventID, this.hideHeaderMobilePopup.bind( this ) )

        .on( 'click.' + this.eventID, '.header-search-toggle', this.searchToggleHandler.bind( this ) )
        .on( 'click.' + this.eventID, '.header-search-close',  this.searchToggleHandler.bind( this ) )

        .on( 'click.' + this.eventID, this.hideSearchHeader.bind( this ) )

        .on( 'click.' + this.eventID, '.mobile-menu .mobi_drop',  this.verticalMobileSubMenuLinkHandle.bind( this ) )

        // Mobile Menu
        .on( 'click.' + this.eventID, '.close-menu', this.resetVerticalMobileMenu.bind( this ) )

        .on( 'hideHeaderMobilePopup.' + this.eventID, this.resetVerticalMobileMenu.bind( this ) );

      // Window Events
      this.$window
        .on('scroll.' + this.eventID, this.scrollToTop.bind( this ) );
    },

    // Sticky Header
    scrollToTop: function( event ) {
      var self        = this,
          $stickyNav  = $( '.sticky-nav' );
      if (self.$window.scrollTop() >= 160) {
          $stickyNav.addClass('sticky-menu');
      }
      else {
          $stickyNav.removeClass('sticky-menu');
      }
    },

    // Mobile Menu Toggle Handler
    menuToggleHandler: function( event ) {
      var self    = this,
        $toggle = $( '.menu-toggle' );

      self.$body.toggleClass( self.classes.headerMenuActive );
      self.$body.toggleClass( self.classes.isOverlay );
      $toggle.toggleClass( self.classes.toggled );

      if ( ! self.$body.hasClass( self.classes.headerMenuActive ) ) {
        $toggle.focus();
      }

      self.menuAccessibility();
    },

    // Mobile Menu Popup Hide
    hideHeaderMobilePopup: function( event ) {
      var self     = this,
        $toggle  = $( '.menu-toggle' ),
        $sidebar = $( '.mobile-menu' );

      if ( $( event.target ).closest( $toggle ).length || $( event.target ).closest( $sidebar ).length ) {
        return;
      }

      if ( ! self.$body.hasClass( self.classes.headerMenuActive ) ) {
        return;
      }

      self.$body.removeClass( self.classes.headerMenuActive );
      self.$body.removeClass( self.classes.isOverlay );
      $toggle.removeClass( self.classes.toggled );

      self.$document.trigger( 'hideHeaderMobilePopup.' + self.eventID );

      event.stopPropagation();
    },

    // Mobile Sub Menu Link Handler
    verticalMobileSubMenuLinkHandle: function( event ) {
      event.preventDefault();

      var self      = this,
        $target   = $( event.currentTarget ),
        $menu     = $target.closest( '.mobile-menu .menu-wrap' ),
        deep      = $target.parents( '.dropdown-menu' ).length,
        direction = self.isRTL ? 1 : -1,
        translate = direction * deep * 100;

      //$menu.css( 'transform', 'translateX(' + translate + '%)' );

      setTimeout( function() {
        $target.parent().toggleClass("current");
        $target.next().slideToggle();
      }, 250 );
    },

    // Reset Mobile Menu Popup
    resetVerticalMobileMenu: function( event ) {
      var self        = this,
        $menu         = $( '.mobile-menu .menu-wrap' ),
        $menuItems    = $( '.mobile-menu  .menu-item' ),
        $deep         = $( '.mobile-menu .dropdown-menu');

      setTimeout( function() {
        $menuItems.removeClass("current");
        $deep.hide();
      }, 250 );
    },

    // Search Box Toggle Handler
    searchToggleHandler: function( event ) {
      var self    = this,
        $toggle   = $( '.header-search-toggle' ),
        $field    = $( '.header-search-field' );

      self.$body.toggleClass( self.classes.headerSearchActive );

      if ( self.$body.hasClass( self.classes.headerSearchActive ) ) {
        $field.focus();
      } else {
        $toggle.focus();
      }

      self.searchPopupAccessibility();
    },

    // Search Box Hide
    hideSearchHeader: function( event ) {
      var self    = this,
        $toggle   = $( '.header-search-toggle' ),
        $popup    = $( '.header-search-popup' );

      if ( $( event.target ).closest( $toggle ).length || $( event.target ).closest( $popup ).length ) {
        return;
      }

      if (  ! self.$body.hasClass( self.classes.headerSearchActive ) ) {
        return;
      }

      self.$body.removeClass( self.classes.headerSearchActive );
      $toggle.focus();

      event.stopPropagation();
    },

    // Active focus on menu popup
    menuAccessibility: function() {
      $( document ).on( 'keydown', function( e ) {
        if ( $( 'body' ).hasClass( 'header-menu-active' ) ) {
          var activeElement = document.activeElement;
          var menuItems = $( '.mobile-menu a' );
          var firstEl = $( '.close-menu' );
          var lastEl = menuItems[ menuItems.length - 1 ];
          var tabKey = event.keyCode === 9;
          var shiftKey = event.shiftKey;
          if ( ! shiftKey && tabKey && lastEl === activeElement ) {
            event.preventDefault();
            firstEl.focus();
          }
        }
      } );
    },

    // Active focus on search popup
    searchPopupAccessibility: function() {
      $( document ).on( 'keydown', function( e ) {
        if ( $( 'body' ).hasClass( 'header-search-active' ) ) {
          var activeElement = document.activeElement;
          var searchItems   = $( '.xl-search-form a, .xl-search-form input' );
          var firstEl       = $( '.header-search-close' );
          var lastEl        = searchItems[ searchItems.length - 1 ];
          var tabKey        = event.keyCode === 9;
          var shiftKey      = event.shiftKey;
          if ( ! shiftKey && tabKey && lastEl === activeElement ) {
            event.preventDefault();
            firstEl.focus();
          }
        }
      } );
    }
  };

  XoloThemeJs.init();

  // Menubar Hover Active
  $('.menubar .menu-wrap > li').hover(
  function(){
    $("li.active").addClass('inactive').removeClass('active');
  },
  function(){
    $("li.inactive").addClass('active').removeClass('inactive'); 
  });
  // Add/Remove focus classess for accessibility
  $('.menubar, .widget_nav_menu').find('a').on('focus blur', function() {
    $( this ).parents('ul, li').toggleClass('focus');
  });
  // Mobile Menu Clone
  $(".menubar .menu-wrap").clone().appendTo(".mobile-menu");
  var $mob_menu = $(".mobile-menu");
  
  $(document).on('change', '#xolo-edd-select-filter', function (event) {
      var orderby = $('#xolo-edd-select-filter').val();
	    var modified_href;
      modified_href = '?sortby=' + orderby;
      modified_href = encodeURI(modified_href);
      window.history.pushState(null, null, modified_href);
      location.reload();
  });

  /*Edd Grid List*/
  function xl_edd_view_switcher() {
      var xl_edd_view_switcher = $('.xl-edd-view-switcher'),
          xl_edd_archive_grid_row = $('body');

      $(document).ready(function() {
          if(xl_edd_archive_grid_row.hasClass('xl-grid')) {
              $('.xl-trigger-grid').addClass('active');
          } else {
              $('.xl-trigger-list').addClass('active');
          }
      });

      xl_edd_view_switcher.on('click load','.xl-trigger-grid',function(){
          xl_edd_archive_grid_row.addClass('xl-grid');
          xl_edd_archive_grid_row.removeClass('xl-list');
          $(this).siblings().removeClass('active');
          $(this).addClass('active');

      });

      xl_edd_view_switcher.on('click','.xl-trigger-list',function(){
          xl_edd_archive_grid_row.addClass('xl-list');
          xl_edd_archive_grid_row.removeClass('xl-grid');
          $(this).siblings().removeClass('active');
          $(this).addClass('active');

      });
  }
  xl_edd_view_switcher();

  $('.single-product-nav li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('.single-product-nav li').removeClass('active');
    $('.tab-panel').removeClass('active');

    $(this).addClass('active');
    $("#"+tab_id).addClass('active');
  });

}( jQuery, window.xoloConfig ));