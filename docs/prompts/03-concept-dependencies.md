# Concept Dependencies

!!! prompt
    The goal of this task is to create a learning dependency graph.

    In the project knowledge area there is a CSV file called concept-list.csv of concepts in a course on Fluid Power Systems. Please use this CSV file of 200 concepts for the next step.

    Please create a fully connected concept dependency graph for the concepts in this course. In this step, for each Concept in the CSV file, create a new list of other concepts on which it depends. If a concept depends on a specific concept that is not listed, then we will need to add it as a new concept. This will help us determine the teaching order of the Concepts.

    Return the new list as a CSV file using the following format:

    1. The first column in the CSV file is a ConceptID you assigned in the list above.
    2. The second column is the ConceptLabel
    3. The third column is called Dependencies. It's format is a pipe-delimited list of the Concept IDs that the concept depends upon.
    
    Check your results to make sure that all concepts are connected to at least one other concept.

    Foundation Concepts are concepts that have no dependant concepts in this set. They have an empty third column of Dependencies.