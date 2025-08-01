# Text redraw issue in react-native-macos 0.78.3

## Steps to reproduce

1. Clone the repository `git clone https://github.com/jamonholmgren/TextRedraw.git`
2. CD into the repository `cd TextRedraw`
3. Run `npm install`
4. Run `npm run add-logs` script to add native logs to the project
5. Run `npm run pod-install`
6. Open in Xcode `open ./macos/TextRedraw.xcworkspace`
7. Run `npm run start` to start the metro server
8. Run the project from Xcode
9. Open the console and see the logs
10. Resize the window:
    1. down to minimum size
    2. back up to normal size
    3. back down to minimum size
    4. Observe constant logs in the console
11. Resize the window back to normal size
    1. Observe the logs stop

# The file to look at first

```
/node_modules/react-native-macos/React/Fabric/Mounting/ComponentViews/Text/RCTParagraphComponentView.mm
```

There will be an `NSLog` in the `RCTParagraphTextView.drawRect` method that is firing.

Note that the other view in this file, `RCTParagraphComponentView`, also fires `drawRect` constantly. You'll have to implement the method to add a log:

```objc
- (void)drawRect:(CGRect)rect {
  NSLog(@"RCTParagraphTextView drawRect: %@", NSStringFromCGRect(rect));
  [super drawRect:rect];
}
```
