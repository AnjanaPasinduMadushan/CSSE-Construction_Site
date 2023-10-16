import 'package:drop_down_search_field/drop_down_search_field.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/constants.dart';
import 'package:mobile/widgets/drawer.dart';
import 'package:date_field/date_field.dart';

class NewOrderView extends StatefulWidget {
  static const routeName = "/newOrder";
  const NewOrderView({super.key});

  @override
  State<NewOrderView> createState() => _NewOrderViewState();
}

class _NewOrderViewState extends State<NewOrderView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const MyDrawer(selection: Selections.newOrder),
      appBar: AppBar(
        title: const Text("New Order"),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: const Icon(Icons.add_task),
      ),
      body: Container(
        width: double.infinity,
        height: double.infinity,
        color: CustomColors.lightGrey,
        child: Padding(
          padding: const EdgeInsets.all(22),
          child: SingleChildScrollView(
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10.0),
                color: Colors.white,
              ),
              padding: const EdgeInsets.all(25),
              child: Form(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Text(
                      'Add Product',
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 25),
                    // Supplier
                    const Text(
                      'Supplier',
                      style: TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w300,
                      ),
                    ),
                    DropDownSearchFormField(
                      itemBuilder: (context, itemData) {
                        return const Text('Selection Option');
                      },
                      suggestionsCallback: (pattern) async {
                        final List<String> suggestions = [
                          'Option 1',
                          'Option 2',
                          'Option 3',
                          'Option 4',
                          'Option 5',
                        ];

                        return suggestions.where((suggestion) => suggestion.contains(pattern)).toList();
                      },
                      onSuggestionSelected: (suggestion) {},
                      textFieldConfiguration: const TextFieldConfiguration(
                        decoration: InputDecoration(
                            border: OutlineInputBorder(),
                            suffixIcon: Icon(Icons.arrow_drop_down),
                            hintText: "Select Supplier"),
                      ),
                    ),
                    const SizedBox(height: 15),
                    //Product
                    const Text(
                      'Product',
                      style: TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w300,
                      ),
                    ),
                    DropDownSearchFormField(
                      itemBuilder: (context, itemData) {
                        return const Text('Selection Option');
                      },
                      suggestionsCallback: (pattern) async {
                        final List<String> suggestions = [
                          'Option 1',
                          'Option 2',
                          'Option 3',
                          'Option 4',
                          'Option 5',
                        ];

                        return suggestions.where((suggestion) => suggestion.contains(pattern)).toList();
                      },
                      onSuggestionSelected: (suggestion) {},
                      textFieldConfiguration: const TextFieldConfiguration(
                        decoration: InputDecoration(
                            border: OutlineInputBorder(),
                            suffixIcon: Icon(Icons.arrow_drop_down),
                            hintText: "Select Product"),
                      ),
                    ),
                    const SizedBox(height: 15),
                    //Quantity
                    const Text(
                      'Quantity',
                      style: TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w300,
                      ),
                    ),
                    const TextField(
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        hintText: "Enter Quantity",
                      ),
                    ),
                    const SizedBox(height: 15),
                    //Date
                    const Text(
                      'Required Date',
                      style: TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w300,
                      ),
                    ),
                    DateTimeFormField(
                      mode: DateTimeFieldPickerMode.date,
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                        hintText: "Select Date",
                      ),
                    ),
                    const SizedBox(height: 35),
                    CupertinoButton.filled(
                      onPressed: () {},
                      child: const Text('Add Product'),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
