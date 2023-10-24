import 'package:flutter/material.dart';

class MessagePopUp {
  static void display(
    BuildContext context, {
    String title = 'Error',
    String message = 'An error occurred.',
    Icon icon = const Icon(Icons.error),
    void Function()? onDismiss,
    bool showCancel = false,
  }) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Row(
            children: <Widget>[
              icon,
              const SizedBox(width: 8),
              Text(title),
            ],
          ),
          content: Text(message),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                if (onDismiss != null) {
                  onDismiss();
                }
              },
              child: const Text('OK'),
            ),
            if (showCancel)
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text('Cancel'),
              ),
          ],
        );
      },
    );
  }
}
