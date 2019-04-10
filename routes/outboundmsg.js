var express = require('express');
var _ = require("lodash");
var router = express.Router();

router.post('/', function(req, res) {
  // get the message as an object
  console.log(req.body);
  var message = unwrapMessage(req.body);
  if (!_.isEmpty(message)) {
    console.log(message);
    // return a 'true' Ack to Salesforce
    res.send(
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:out="http://soap.sforce.com/2005/09/outbound"><soapenv:Header></soapenv:Header><soapenv:Body><out:notificationsResponse><out:Ack>true</out:Ack></out:notificationsResponse></soapenv:Body></soapenv:Envelope>'
    );
  } else {
    // return a 'false' Ack to Salesforce
    res.send(
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:out="http://soap.sforce.com/2005/09/outbound"><soapenv:Header></soapenv:Header><soapenv:Body><out:notificationsResponse><out:Ack>false</out:Ack></out:notificationsResponse></soapenv:Body></soapenv:Envelope>'
    );
  }

});

// unwrap the xml and return sfId
unwrapMessage = function(obj) {
  try {
    //console.log(obj['soapenv:envelope']['soapenv:body'][0].notifications[0].organizationid[0]);
    var numNotifications = Object.keys(obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification).length;
    var i;
    var sobjects = [];
    for (i = 0; i < numNotifications; i++)
    {
      sobjects.push(obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[i].sobject[0]);
//       console.log(obj);
//       console.log(obj['soapenv:envelope']['soapenv:body'][0]);
//       console.log(obj['soapenv:envelope']['soapenv:body'][0].notifications[0]);
//       console.log(obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[i].sobject[0]);
    }
//     var sfId = obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[0]['sf:id'][0];   

    return {
      NumberOfNotifications: numNotifications,
    };

  } catch (e) {
    console.log('Could not parse OBM XML', e);
    return {};
  }
};

module.exports = router;
