let rp = require('request-promise');
let cheerio = require('cheerio');

exports.matchesByCategory = function(category, pageNumber = 1, limitNbr = 12) {
  let options = {
      method: 'POST',
      uri: 'http://fullmatchtv.com/wp-admin/admin-ajax.php',
      qs: {
          td_theme_name: 'Newspaper',
          v: '7.1.1',
      },
      form: {
        action:'td_ajax_block',
        td_atts:'{"limit":"' + limitNbr + '","sort":"","post_ids":"","tag_slug":"","autors_id":"","installed_post_types":"","category_id":"","category_ids":"","custom_title":"","custom_url":"","show_child_cat":"","sub_cat_ajax":"","ajax_pagination":"next_prev","header_color":"","header_text_color":"","ajax_pagination_infinite_stop":"","td_column_number":2,"td_ajax_preloading":"","td_ajax_filter_type":"td_category_ids_filter","td_ajax_filter_ids":"","td_filter_default_txt":"All","color_preset":"","border_top":"","class":"td_uid_4_576d7b2e88ad7_rand","offset":"","live_filter":"","live_filter_cur_post_id":"","live_filter_cur_post_author":""}',
        td_block_id:'td_uid_4_576d7b2e88ad7',
        td_column_number:2,
        td_current_page: pageNumber,
        block_type:'td_block_3',
        td_filter_value: category.id,
      },
      headers: {
          'content-type': 'text/html;',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36'
      },
      transform: function (body) {
        var json = JSON.parse(body);
        return cheerio.load(json.td_data);
      }
  };

  return rp(options);
};
