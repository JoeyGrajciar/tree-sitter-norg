module.exports = grammar({
  	name: 'norg',

	externals: $ => [
    	$._,

    	$.paragraph_segment,
    	$.escape_sequence_prefix,

        $.heading1_prefix,
        $.heading2_prefix,
        $.heading3_prefix,
        $.heading4_prefix,
        $.heading5_prefix,
        $.heading6_prefix,

        $.quote_prefix,
        $.unordered_list_prefix,

        $.paragraph_delimiter
  	],

  	rules: {
        document: $ => repeat1(
            choice(
                prec(1,
                    $._standalone_break
                ),

                $.escape_sequence,

                $.paragraph,
                $.paragraph_delimiter,

                $._heading,
                $._detached_modifier,
            )
        ),

        paragraph: $ =>
            prec.right(0,
                repeat1(
                    alias(
                        $.paragraph_segment,
                        "_segment",
                    )
                )
            ),

        any_char: $ =>
            token.immediate(/./),

        escape_sequence: $ =>
            seq(
                $.escape_sequence_prefix,

                field(
                    "token",
                    $.any_char,
                )
            ),

        heading1: $ =>
            prec.right(0,
                seq(
                    $.heading1_prefix,

                    field(
                        "title",
                        $.paragraph_segment,
                    ),

                    field(
                        "content",

                        repeat(
                            choice(
                                $.paragraph,

                                $._standalone_break,
                                $._detached_modifier,

                                $.heading2,
                                $.heading3,
                                $.heading4,
                                $.heading5,
                                $.heading6,
                            )
                        )
                    )
                )
            ),

        heading2: $ =>
            prec.right(0,
                seq(
                    $.heading2_prefix,

                    field(
                        "title",
                        $.paragraph_segment,
                    ),

                    field(
                        "content",

                        repeat(
                            choice(
                                $.paragraph,

                                $._standalone_break,
                                $._detached_modifier,

                                $.heading3,
                                $.heading4,
                                $.heading5,
                                $.heading6,
                            )
                        )
                    )
                )
            ),

        heading3: $ =>
            prec.right(0,
                seq(
                    $.heading3_prefix,

                    field(
                        "title",
                        $.paragraph_segment,
                    ),

                    field(
                        "content",

                        repeat(
                            choice(
                                $.paragraph,

                                $._standalone_break,
                                $._detached_modifier,

                                $.heading4,
                                $.heading5,
                                $.heading6,
                            )
                        )
                    )
                )
            ),

        heading4: $ =>
            prec.right(0,
                seq(
                    $.heading4_prefix,

                    field(
                        "title",
                        $.paragraph_segment,
                    ),

                    field(
                        "content",

                        repeat(
                            choice(
                                $.paragraph,

                                $._standalone_break,
                                $._detached_modifier,

                                $.heading5,
                                $.heading6,
                            )
                        )
                    )
                )
            ),

        heading5: $ =>
            prec.right(0,
                seq(
                    $.heading5_prefix,

                    field(
                        "title",
                        $.paragraph_segment,
                    ),

                    field(
                        "content",

                        repeat(
                            choice(
                                $.paragraph,

                                $._standalone_break,
                                $._detached_modifier,

                                $.heading6,
                            )
                        )
                    )
                )
            ),

        heading6: $ =>
            prec.right(0,
                seq(
                    $.heading6_prefix,

                    field(
                        "title",
                        $.paragraph_segment,
                    ),

                    field(
                        "content",

                        repeat(
                            choice(
                                $.paragraph,

                                $._standalone_break,
                                $._detached_modifier,
                            )
                        )
                    )
                )
            ),


        quote: $ =>
            seq(
                $.quote_prefix,

                field(
                    "content",
                    $.paragraph_segment,
                )
            ),

        unordered_list: $ =>
            seq(
                $.unordered_list_prefix,

                field(
                    "content",
                    $.paragraph,
                )
            ),

        _standalone_break: $ =>
            token(/\n/),

        _heading: $ =>
            choice(
                $.heading1,
                $.heading2,
                $.heading3,
                $.heading4,
                $.heading5,
                $.heading6,
            ),

        // A list of detached modifiers (excluding headings, those belong in the $._heading group)
        _detached_modifier: $ =>
            choice(
                $.quote,
                $.unordered_list
            ),

    	/*
        "document",
		"quote",
		"heading1_prefix",
		"heading2_prefix",
		"heading3_prefix",
		"heading4_prefix",
		"heading1",
		"heading2",
		"heading3",
		"heading4",
		"unordered_list_prefix",
		"unordered_list",
		"unordered_link_list_prefix",
		"unordered_link_list",
		"marker",
		"todo_item_prefix",
		"todo_item_suffix",
		"todo_item_done_mark",
		"todo_item_pending_mark",
		"todo_item_undone_mark",
		"todo_item_done",
		"todo_item_pending",
		"todo_item_undone",
		"tag",
		"tag_content",
		"tag_name",
		"tag_parameters",
		"tag_end",
		"carryover_tag",
		"drawer",
		"drawer_content",
		"paragraph",
		"_eof",
		"_soft_paragraph_break",
		"leading_whitespace",
		"escape_sequence",
		"words",
		"paragraph_segment",
		"_detached_modifiers", */
  	}
});
