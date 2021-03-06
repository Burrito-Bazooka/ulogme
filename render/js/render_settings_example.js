/*
 * render_settings_example.js for https://github.com/Naereen/uLogMe/
 * MIT Licensed, https://lbesson.mit-license.org/
*/
// various settings for the rendering, to be modified by user

// these are all regex patterns and the corresponding mapped title string
// the function mapwin() below will use these to transform the raw window
// titles into common groups. For example, any title mentioning Google Chrome
// may get mapped to just "Google Chrome".
// these get applied in order they are specified, from top to bottom
var title_mappings = [
    // Internet
    {pattern: /Google Chrome/,        mapto: "Firefox"}, // lol
    {pattern: /Firefox/,              mapto: "Firefox"},
    // Social browsing
    {pattern: /Outlook/,              mapto: "Mails"},
    {pattern: /GMail/,                mapto: "Mails"},
    {pattern: /Thunderbird/,          mapto: "Mails"},
    {pattern: /Skype/,                mapto: "Skype"},
    {pattern: /Facebook/,             mapto: "Facebook"},
    {pattern: /Slack/,                mapto: "Slack"},
    // Self-quantified browsing
    {pattern: /Stats pour/,           mapto: "Self-Quantified"},
    {pattern: /Munin/,                mapto: "Self-Quantified"},
    {pattern: /uLogMe - /,            mapto: "Self-Quantified"},
    {pattern: /WakaTime/,             mapto: "Self-Quantified"},
    {pattern: /Google Analytics/,     mapto: "Self-Quantified"},
    // Agenda
    {pattern: /TODO list/,            mapto: "Agenda"},
    {pattern: /Google Agenda/,        mapto: "Agenda"},
    // Hacking browsing
    {pattern: /GitHub/,               mapto: "GitHub"},
    {pattern: / · Naereen\//,         mapto: "GitHub"},
    {pattern: /Bitbucket/,            mapto: "Bitbucket"},
    // Music
    {pattern: /YouTube/,              mapto: "YouTube"},
    {pattern: /VLC/,                  mapto: "VLC"},
    {pattern: / par /,                mapto: "GMusicBrowser"},
    // Programming
    {pattern: /MATLAB/,               mapto: "Matlab"},
    {pattern: /Figure/,               mapto: "Matlab"},
    {pattern: /notebook/,             mapto: "Notebook"},
    {pattern: /.pdf/,                 mapto: "PDF"},
    {pattern: /Terminal/,             mapto: "Terminal"},
    // Sublime Text 3 patterns
    {pattern: /Sublime Text/,         mapto: "ST3"},
    {pattern: /\.py.*Sublime Text/,   mapto: "ST3 Python"},
    {pattern: /\.js.*Sublime Text/,   mapto: "ST3 JS"},
    {pattern: /\.html.*Sublime Text/, mapto: "ST3 HTML"},
    {pattern: /\.css.*Sublime Text/,  mapto: "ST3 HTML"},
    {pattern: /\.tex.*Sublime Text/,  mapto: "ST3 LaTeX"},
    {pattern: /\.md.*Sublime Text/,   mapto: "ST3 Markdown"},
    {pattern: /\.rst.*Sublime Text/,  mapto: "ST3 rST"},
    // Extra
    {pattern: /__LOCKEDSCREEN/,       mapto: "Locked Screen"}, // __LOCKEDSCREEN is a special token FIXME on Linux does it work?
];

// be very careful with ordering in the above because titles
// get matched from up to down (see mapwin()), so put the more specific
// window title rules on the bottom and more generic ones on top

/*
This function takes a raw window title w as string
and outputs a more compact code, to be treated as a single
unit during rendering. Every single possibility output from
this function will have its own row and its own analysis
*/
function mapwin(w) {
  var n = title_mappings.length;
  var mapped_title = "MISC";
  for(var i=0;i<n;i++) {
    var patmap = title_mappings[i];
    if(patmap.pattern.test(w)) {
      mapped_title = patmap.mapto;
    }
  }
  return mapped_title;
}

// These groups will be rendered together in the "barcode view". For example, I like
// to group my work stuff and play stuff together.
var display_groups = [];
display_groups.push(["GitHub", "Bitbucket"]); // Hacking browsing
display_groups.push(["Mail", "Skype", "Facebook", "Slack"]); // Social browsing
display_groups.push(["YouTube", "VLC", "GMusicBrowser"]); // Music
display_groups.push(["Agenda", "Self-Quantified"]); // Self-quantified browsing and Agenda
display_groups.push(["Firefox", "ST3", "Terminal", "Misc"]); // Various works/geeking
display_groups.push(["Matlab", "ST3 Coding", "ST3 Python", "Notebook"]); // Work related
display_groups.push(["ST3 JS", "ST3 HTML", "ST3 Markdown", "ST3 rST"]); // Coding related
display_groups.push(["ST3 LaTeX", "PDF"]); // Paper writing related
display_groups.push(["Locked Screen"]); // Computer not being used

// list of titles that classify as "hacking", or being productive in general
// the main goal of the day is to get a lot of focused sessions of hacking
// done throughout the day. Windows that arent in this list do not
// classify as hacking, and they break "streaks" (events of focused hacking)
// the implementation is currently quite hacky, experimental and contains
// many magic numbers.
var hacking_titles = ["Notebook", "Terminal", "Matlab", "ST3 Coding", "ST3 Python", "ST3 JS", "ST3 HTML", "ST3 HTML", "ST3 LaTeX", "ST3 Markdown", "ST3 rST", "ST3"];
var draw_hacking = true; // by default turning this off

// draw notes row?
var draw_notes = true;

// experimental coffee levels indicator :)
// looks for notes that mention coffee and shows
// levels of coffee in body over time
var draw_coffee = false;
