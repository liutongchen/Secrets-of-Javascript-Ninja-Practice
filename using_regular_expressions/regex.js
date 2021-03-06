function assert(a, b) {
    if(a) {console.log(b)}
    else {console.log("Oops")}
}
//1. differences between local and global matches-------------------------------------------------------------------
const html = "<div class='test'><b>Hello</b> <i>world!</i></div>";
const localResults = html.match(/<(\/?)(\w+)([^>]*?)>/)//match the first pair of tags
assert(localResults[0] === "<div class='test'>", "The entire match.");
assert(localResults[1] === "", "The (missing) slash.");
assert(localResults[2] === "div", "The tag name.");
assert(localResults[3] === " class='test'", "The attributes.");

const globalResults = html.match(/<(\/?)(\w+)([^>]*?)>/g) //match all the tags
assert(globalResults[0] === "<div class='test'>", "Opening div tag.");
assert(globalResults[1] === "<b>", "Opening b tag.");
assert(globalResults[2] === "</b>", "Closing b tag.");
assert(globalResults[3] === "<i>", "Opening i tag.");
assert(globalResults[4] === "</i>", "Closing i tag.");
assert(globalResults[5] === "</div>", "Closing div tag.");

//2.using "exec" method to do both capturing and global search-------------------------------------------------------
const tag = /<(\/?)(\w+)([^>]*?)>/g;
let match = 0;
let num = 0;
while ((match = tag.exec(html)) !== null) {
    assert(match.length === 4, "contains the entire matched tag and 3 captures");
    num++;
}
assert(num === 6, "total 6 matches: 3 opending tags and 3 closing tags");

//3. grouping without capturing--------------------------------------------------------------------------------------
const groupingNoCapturingRule = /((?:bla-)+)something/;
const groupingNoCapturingResult = "bla-bla-bla-something".match(groupingNoCapturingRule);
assert(groupingNoCapturingResult.length === 2, "only one capture is returned");

//4. replacing with functions-----------------------------------------------------------------------------------------
//task1: convert the dashed string into camel case
function dashStToUpper(all, letter) { return letter.toUpperCase(); }
assert("border-bottom-width".replace(/-(\w)/g, dashStToUpper) === "borderBottomWidth", "camel cased the dashed strings");

//task2: turn "foo=1&foo=2&blah=a&blah=b&foo=3" to "foo=1,2,3&blah=a,b"
function compress(source) {
    const keys = {};
    source.replace(/([^&=]+)=([^&]*)/g, function(full, key, value) {
        keys[key] = (keys[key] ? keys[key] + ",": "") + value;
        return ""
    });
    const result = [];
    for (let key in keys) {
        result.push(key + "=" + keys[key])
    }
    return result.join("&");
}
assert(compress("foo=1&foo=2&blah=a&blah=b&foo=3") === "foo=1,2,3&blah=a,b", "I did it!")
