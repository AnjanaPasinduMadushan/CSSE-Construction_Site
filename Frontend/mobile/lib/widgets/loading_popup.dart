import 'dart:async';
import 'package:flutter/material.dart';

class LoadingPopup {
  static final LoadingPopup _instance = LoadingPopup._internal();
  factory LoadingPopup() => _instance;
  LoadingPopup._internal();

  bool _isDisplayed = false;

  late Completer<void> _completion; // Mark as 'late'

  late BuildContext _context; // Store the context

  void _show(BuildContext context, {String message = 'Loading...'}) {
    if (!_isDisplayed) {
      _context = context; // Store the context
      _isDisplayed = true;
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (context) {
          return AlertDialog(
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                const CircularProgressIndicator(),
                const SizedBox(height: 10),
                Text(message),
              ],
            ),
          );
        },
      ).then((_) {
        _isDisplayed = false;
        _completion.complete(); // Complete the future when the dialog is dismissed.
      });
    }
  }

  Future<void> display(BuildContext context, {String message = 'Loading...'}) async {
    _completion = Completer<void>();
    _show(context, message: message);
    await _completion.future;
  }

  void remove() {
    if (_isDisplayed) {
      Navigator.pop(_context); // Use the stored context
      _isDisplayed = false;
    }
  }
}
