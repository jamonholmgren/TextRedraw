// Add NSLog to the right file

const rctParagraphComponentViewPath =
  'node_modules/react-native-macos/React/Fabric/Mounting/ComponentViews/Text/RCTParagraphComponentView.mm';

const textToFind = `
  self.minSize = frame.size;
  self.maxSize = frame.size;
  self.frame = frame;
  [[self textStorage] setAttributedString:textStorage];

  [super drawRect:rect];`;

const textToReplace = `  self.minSize = frame.size;
  self.maxSize = frame.size;
  self.frame = frame;
  [[self textStorage] setAttributedString:textStorage];

  NSLog(@"RCTParagraphComponentView drawRect: %@", NSStringFromCGRect(rect));
  [super drawRect:rect];`;

const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const rctParagraphComponentViewFullPath = path.join(
  projectRoot,
  rctParagraphComponentViewPath,
);

const fileContent = fs.readFileSync(rctParagraphComponentViewFullPath, 'utf8');

const hasOldText = fileContent.includes(textToFind);

if (hasOldText) {
  const newFileContent = fileContent.replace(textToFind, textToReplace);
  fs.writeFileSync(rctParagraphComponentViewFullPath, newFileContent);
} else {
  console.log('No old text found');
}

console.log('Done patching file: ' + rctParagraphComponentViewFullPath);
