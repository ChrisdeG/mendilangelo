/*
    Generate a find or create microflow
*/

import { domainmodels, microflows, datatypes, texts, IModel, expressions } from "mendixmodelsdk";
import { findOrCreateModuleAndFolder, MicroflowExists } from "./findOrCreateModuleAndFolder";

export function generateFindOrCreateForEntity(model: IModel, domainModel: domainmodels.DomainModel, entityName: string,  targetModule: string) {
    /*
     * JavaScript code generated by mendixmodelsdk.sdk.extras.JavaScriptSerializer
     */
    const folder = findOrCreateModuleAndFolder(model, domainModel.containerAsModule.name, targetModule, entityName);
    const entity = domainModel.entities.filter((entity: domainmodels.Entity) => entity.name === entityName)[0];

    let microflowName = `${entityName}_FindOrCreate`;
    if (!MicroflowExists(model, targetModule, microflowName, folder)) {

        var startEvent1 = microflows.StartEvent.create(model);
        startEvent1.relativeMiddlePoint = { "x": 85, "y": 200 };
        startEvent1.size = { "width": 20, "height": 20 };

        var noExpression1 = expressions.NoExpression.create(model);

        var endEvent1 = microflows.EndEvent.create(model);
        endEvent1.relativeMiddlePoint = { "x": 595, "y": 200 };
        endEvent1.size = { "width": 20, "height": 20 };
        endEvent1.returnValue = `\$${entityName}`;
        endEvent1.returnValueModel = noExpression1; // Note: for this property a default value is defined.

        var constantRange1 = microflows.ConstantRange.create(model);
        constantRange1.singleObject = true;

        var sortItemList1 = microflows.SortItemList.create(model);

        var databaseRetrieveSource1 = microflows.DatabaseRetrieveSource.create(model);
        databaseRetrieveSource1.entity = entity;
        databaseRetrieveSource1.range = constantRange1; // Note: for this property a default value is defined.
        databaseRetrieveSource1.sortItemList = sortItemList1; // Note: for this property a default value is defined.

        var retrieveAction1 = microflows.RetrieveAction.create(model);
        retrieveAction1.retrieveSource = databaseRetrieveSource1; // Note: for this property a default value is defined.
        retrieveAction1.outputVariableName = entityName;

        var actionActivity1 = microflows.ActionActivity.create(model);
        actionActivity1.relativeMiddlePoint = { "x": 230, "y": 200 };
        actionActivity1.size = { "width": 120, "height": 60 };
        actionActivity1.action = retrieveAction1;
        //actionActivity1.caption = "Activity";
        actionActivity1.autoGenerateCaption = true;

        var annotation1 = microflows.Annotation.create(model);
        annotation1.relativeMiddlePoint = { "x": 230, "y": 10 };
        annotation1.size = { "width": 230, "height": 50 };
        annotation1.caption = "Add your constraints here";

        var noExpression2 = expressions.NoExpression.create(model);

        var expressionSplitCondition1 = microflows.ExpressionSplitCondition.create(model);
        expressionSplitCondition1.expression = `\$${entityName} != empty`;
        expressionSplitCondition1.expressionModel = noExpression2; // Note: for this property a default value is defined.

        var exclusiveSplit1 = microflows.ExclusiveSplit.create(model);
        exclusiveSplit1.relativeMiddlePoint = { "x": 405, "y": 200 };
        exclusiveSplit1.size = { "width": 90, "height": 60 };
        exclusiveSplit1.splitCondition = expressionSplitCondition1; // Note: for this property a default value is defined.
        exclusiveSplit1.caption = `${entityName} found`;

        var createObjectAction1 = microflows.CreateObjectAction.create(model);
        createObjectAction1.entity = entity;
        createObjectAction1.outputVariableName = `New${entityName}`;

        var actionActivity2 = microflows.ActionActivity.create(model);
        actionActivity2.relativeMiddlePoint = { "x": 405, "y": 340 };
        actionActivity2.size = { "width": 120, "height": 60 };
        actionActivity2.action = createObjectAction1;
        //actionActivity2.caption = "Activity";
        actionActivity2.autoGenerateCaption = true;

        var noExpression3 = expressions.NoExpression.create(model);

        var endEvent2 = microflows.EndEvent.create(model);
        endEvent2.relativeMiddlePoint = { "x": 595, "y": 340 };
        endEvent2.size = { "width": 20, "height": 20 };
        endEvent2.returnValue = `$New${entityName}`;
        endEvent2.returnValueModel = noExpression3; // Note: for this property a default value is defined.

        var microflowObjectCollection1 = microflows.MicroflowObjectCollection.create(model);
        microflowObjectCollection1.objects.push(startEvent1);
        microflowObjectCollection1.objects.push(endEvent1);
        microflowObjectCollection1.objects.push(actionActivity1);
        microflowObjectCollection1.objects.push(annotation1);
        microflowObjectCollection1.objects.push(exclusiveSplit1);
        microflowObjectCollection1.objects.push(actionActivity2);
        microflowObjectCollection1.objects.push(endEvent2);

        var noCase1 = microflows.NoCase.create(model);

        var sequenceFlow1 = microflows.SequenceFlow.create(model);
        sequenceFlow1.originConnectionIndex = 1;
        sequenceFlow1.destinationConnectionIndex = 3;
        sequenceFlow1.originBezierVector = { "width": 0, "height": 0 };
        sequenceFlow1.destinationBezierVector = { "width": -30, "height": 0 };
        sequenceFlow1.caseValue = noCase1; // Note: for this property a default value is defined.

        var noCase2 = microflows.NoCase.create(model);

        var sequenceFlow2 = microflows.SequenceFlow.create(model);
        sequenceFlow2.originConnectionIndex = 1;
        sequenceFlow2.destinationConnectionIndex = 3;
        sequenceFlow2.originBezierVector = { "width": 30, "height": 0 };
        sequenceFlow2.destinationBezierVector = { "width": -15, "height": 0 };
        sequenceFlow2.caseValue = noCase2; // Note: for this property a default value is defined.

        var annotationFlow1 = microflows.AnnotationFlow.create(model);
        annotationFlow1.originConnectionIndex = 1;
        annotationFlow1.originBezierVector = { "width": 0, "height": 0 };
        annotationFlow1.destinationBezierVector = { "width": 0, "height": -30 };

        var enumerationCase1 = microflows.EnumerationCase.create(model);
        enumerationCase1.value = "true";

        var sequenceFlow3 = microflows.SequenceFlow.create(model);
        sequenceFlow3.originConnectionIndex = 1;
        sequenceFlow3.destinationConnectionIndex = 3;
        sequenceFlow3.originBezierVector = { "width": 15, "height": 0 };
        sequenceFlow3.destinationBezierVector = { "width": -15, "height": 0 };
        sequenceFlow3.caseValue = enumerationCase1; // Note: for this property a default value is defined.

        var enumerationCase2 = microflows.EnumerationCase.create(model);
        enumerationCase2.value = "false";

        var sequenceFlow4 = microflows.SequenceFlow.create(model);
        sequenceFlow4.originConnectionIndex = 2;
        sequenceFlow4.originBezierVector = { "width": 0, "height": 15 };
        sequenceFlow4.destinationBezierVector = { "width": 0, "height": -30 };
        sequenceFlow4.caseValue = enumerationCase2; // Note: for this property a default value is defined.

        var noCase3 = microflows.NoCase.create(model);

        var sequenceFlow5 = microflows.SequenceFlow.create(model);
        sequenceFlow5.originConnectionIndex = 1;
        sequenceFlow5.destinationConnectionIndex = 3;
        sequenceFlow5.originBezierVector = { "width": 30, "height": 0 };
        sequenceFlow5.destinationBezierVector = { "width": -15, "height": 0 };
        sequenceFlow5.caseValue = noCase3; // Note: for this property a default value is defined.

        var objectType1 = datatypes.ObjectType.create(model);
        objectType1.entity = entity;

        var translation1 = texts.Translation.create(model);
        translation1.languageCode = "en_US";

        var text1 = texts.Text.create(model);
        text1.translations.push(translation1);

        var findOrCreateMicroflow = microflows.Microflow.createIn(folder);
        findOrCreateMicroflow.name = microflowName
        findOrCreateMicroflow.objectCollection = microflowObjectCollection1; // Note: for this property a default value is defined.
        findOrCreateMicroflow.flows.push(sequenceFlow1);
        findOrCreateMicroflow.flows.push(sequenceFlow2);
        findOrCreateMicroflow.flows.push(annotationFlow1);
        findOrCreateMicroflow.flows.push(sequenceFlow3);
        findOrCreateMicroflow.flows.push(sequenceFlow4);
        findOrCreateMicroflow.flows.push(sequenceFlow5);
        findOrCreateMicroflow.microflowReturnType = objectType1;
        findOrCreateMicroflow.allowConcurrentExecution = true;
        findOrCreateMicroflow.concurrencyErrorMessage = text1; // Note: for this property a default value is defined.

        sequenceFlow1.origin = startEvent1;
        sequenceFlow1.destination = actionActivity1;

        sequenceFlow2.origin = actionActivity1;
        sequenceFlow2.destination = exclusiveSplit1;

        annotationFlow1.origin = annotation1;
        annotationFlow1.destination = actionActivity1;

        sequenceFlow3.origin = exclusiveSplit1;
        sequenceFlow3.destination = endEvent1;

        sequenceFlow4.origin = exclusiveSplit1;
        sequenceFlow4.destination = actionActivity2;

        sequenceFlow5.origin = actionActivity2;
        sequenceFlow5.destination = endEvent2;

        let annotation = microflows.Annotation.createIn(findOrCreateMicroflow.objectCollection);
        annotation.caption = "This microflow was automatically generated by Mendilangelo. Don't use this here but copy or move it to your own module.";
        annotation.relativeMiddlePoint = { x: startEvent1.relativeMiddlePoint.x + 40, y: startEvent1.relativeMiddlePoint.y - 100 };
        annotation.size = { width: 200, height: 100 };
    }
}
